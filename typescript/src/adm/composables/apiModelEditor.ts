import { unref } from 'vue';

import type { ApiOptions, IApiClient, ApiResult } from '../api.types';
import type { Model } from '../model';
import type { Repository } from '../repository';

import type { EditorErrors, EditorErrorContext } from './editor';
import { useModelEditor, type ModelEditor, type ModelEditorOptions } from './modelEditor';

/**
 * Options for an API-backed model editor.
 */
export interface ApiModelEditorOptions<TModel extends Model>
    extends Omit<ModelEditorOptions<TModel>, 'save'> {
    /**
     * Options passed to API create and update operations.
     */
    api?: ApiOptions;

    /**
     * Converts an API or transport error into editor errors.
     *
     * The callback receives the original error, which may be an ApiResult.
     *
     * @param error Original API or transport error.
     * @returns Normalized editor errors, or undefined when no errors can be mapped.
     */
    parseErrors?: (error: unknown) => EditorErrors | undefined;
}

/**
 * Editor backed by an API client.
 */
export interface ApiModelEditor<TModel extends Model>
    extends ModelEditor<TModel> {
    /**
     * API client used for persistence.
     */
    readonly api: IApiClient<TModel>;
}

/**
 * Checks whether normalized errors contain at least one message.
 *
 * @param errors Normalized editor errors.
 * @returns Whether at least one error message exists.
 */
function hasErrors(errors?: EditorErrors): boolean {
    if (!errors) {
        return false;
    }

    if (errors.global?.length) {
        return true;
    }

    return Object.values(errors.fields ?? {}).some(
        (messages) => messages.length > 0,
    );
}

/**
 * Creates an API-backed editor for a model.
 *
 * The API client is obtained from the repository. Models are created or
 * updated according to the presence of their identifier.
 *
 * A successful API response synchronizes the editor with the returned model
 * when available, or with the submitted data otherwise.
 *
 * @param repository Repository handling the edited model.
 * @param source Initial source model, or null to create a new model.
 * @param options Editor and API configuration.
 * @returns An API-backed model editor.
 * @throws Error when the repository has no configured API client.
 */
export function useApiModelEditor<TModel extends Model>(
    repository: Repository<TModel>,
    source: TModel | null,
    options: ApiModelEditorOptions<TModel> = {},
): ApiModelEditor<TModel> {
    const {
        api: apiOptions,
        parseErrors,
        onError,
        onSave,
        ...modelOptions
    } = options;

    const api = repository.api();

    if (!api) {
        throw new Error(
            `No API client configured for repository "${repository.modelName}".`,
        );
    }

    /**
     * Handles persistence through the API.
     *
     * @param data Snapshot of the edited model.
     * @param _source Original source model.
     * @param context Model editor save context.
     * @returns API operation result.
     */
    async function save(
        data: TModel,
        _source: TModel,
        context: Parameters<
            NonNullable<ModelEditorOptions<TModel>['save']>
        >[2],
    ): Promise<ApiResult<TModel> | null> {
        const id = Reflect.get(data, repository.model.idField);
        if (api === null)
            throw new Error(
                `No API client configured for repository "${repository.modelName}".`,
            );

        const result = id === null || id === undefined
            ? await api.create(data, apiOptions)
            : await api.update(id, data, apiOptions);

        // A null result does not necessarily represent an API error.
        // In this case, keep the submitted model as the saved model.
        if (result === null) {
            context.defaultSave();
            return null;
        }

        const errors = parseErrors?.(result);
        if (!result.ok || hasErrors(errors))
            throw result;

        // Use the server-side model when available.
        const returnedModel = result.items?.[0];

        if (returnedModel)
            Object.assign(data, unref(returnedModel).copy());

        // Synchronize both the source and editor with the submitted model.
        context.defaultSave();

        return result;
    }

    /**
     * Maps API errors to editor errors while preserving the user's callback.
     *
     * @param error Original error.
     * @param context Editor error context.
     */
    function handleError(
        error: unknown,
        context: EditorErrorContext<TModel>,
    ): void {
        const errors = parseErrors?.(error);

        if (hasErrors(errors)) {
            context.setErrors(errors!);
        }

        onError?.(error, context);
    }

    /**
     * Synchronizes the editor data after a successful API save.
     *
     * @param result API operation result.
     * @param data Submitted model snapshot.
     */
    function handleSave(result: unknown, data: TModel): void {
        if (result === null || (result as ApiResult<TModel>).ok) {
            Object.assign(editor.data, data.copy());
        }

        onSave?.(result, data);
    }

    const editor: ApiModelEditor<TModel> = useModelEditor(repository, source, {
        ...modelOptions,
        save,
        onError: handleError,
        onSave: handleSave,
    });

    return Object.assign(editor, {
        api,
    });
}
