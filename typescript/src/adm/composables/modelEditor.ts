import type { Editor, EditorOptions, EditorSave } from './editor';
import type { Model } from '../model';
import type { Repository } from '../repository';

import { useEditor } from './editor';

/**
 * Options for a model editor.
 */
export interface ModelEditorOptions<TModel extends Model>
    extends Omit<EditorOptions<TModel>, 'fields' | 'copy' | 'save'> {
    /**
     * Custom persistence callback.
     *
     * The default model synchronization can be invoked through context.defaultSave().
     */
    save?: EditorSave<TModel>;
}

/**
 * Editor adapted to an Ox-Watt model.
 */
export interface ModelEditor<TModel extends Model>
    extends Editor<TModel> {
    /** Repository managing the edited model. */
    readonly repository: Repository<TModel>;

    /**
     * Changes the edited model.
     *
     * Passing null creates a new model initialized with its default values.
     *
     * @param source New model instance, or null.
     */
    setSource(source: TModel | null): void;
}

/**
 * Creates an editor adapted to an Ox-Watt model.
 *
 * @param repository Repository managing the model type.
 * @param source Initial model instance, or null to create a new model.
 * @param options Additional editor options.
 * @returns A model editor.
 */
export function useModelEditor<TModel extends Model>(
    repository: Repository<TModel>,
    source: TModel | null,
    options: ModelEditorOptions<TModel> = {},
): ModelEditor<TModel> {
    const modelClass = repository.model;
    const fields = Object.keys(modelClass.getFields()) as (keyof TModel)[];

    /**
     * Creates a new model initialized with its default values.
     *
     * @returns A new model instance.
     */
    function createModel(): TModel {
        return new modelClass(modelClass.getDefaults());
    }

    /**
     * Synchronizes a model source with an edited model snapshot.
     *
     * @param data Submitted model snapshot.
     * @param target Original model instance.
     */
    function defaultSave(data: TModel, target: TModel): void {
        Object.assign(target, data.copy());
    }

    /**
     * Wraps the custom save callback to provide model-specific defaults.
     *
     * @param data Submitted model snapshot.
     * @param target Original model instance.
     * @param context Generic editor save context.
     * @returns The custom save result.
     */
    const save: EditorSave<TModel> = (data, target, context) => {
        const modelSaveContext = {
            defaultSave: () => {
                context.defaultSave(() => {
                    defaultSave(data, target);
                });
            },
        };

        if (options.save) {
            return options.save(data, target, modelSaveContext);
        }

        modelSaveContext.defaultSave();
    };

    const editor = useEditor(source ?? createModel(), {
        ...options,
        fields,
        copy: (model) => model.copy(),
        save,
    });

    // Keep the original setSource implementation before overriding it.
    const setEditorSource = editor.setSource;

    function setSource(nextSource: TModel | null): void {
        setEditorSource(nextSource ?? createModel());
    }

    return Object.assign(editor, {
        repository,
        setSource,
    });
}
