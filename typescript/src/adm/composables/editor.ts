import {
    computed,
    reactive,
    ref,
    shallowRef,
    watch,
    type ComputedRef,
    type Ref,
    type ShallowRef,
} from 'vue';

import { cloneDeep, isEqual } from 'lodash-es';

/**
 * Normalized errors managed by an editor.
 */
export interface EditorErrors {
    /** Errors associated with individual fields. */
    fields?: Record<string, string[]>;

    /** Errors associated with the entire object or operation. */
    global?: string[];
}

/**
 * Context provided when an editor operation fails.
 */
export interface EditorErrorContext<TData extends object> {
    /** Source object involved in the failed operation. */
    source: TData;

    /** Snapshot of the data involved in the failed operation. */
    data: TData;

    /**
     * Associates errors with the submitted data snapshot.
     *
     * @param errors Normalized errors to apply.
     */
    setErrors: (errors: EditorErrors) => void;
}

/**
 * Configuration options for a generic editor.
 */
export interface EditorOptions<TData extends object> {
    /** Fields managed by the editor. */
    fields: readonly (keyof TData)[];

    /**
     * Custom function used to copy the source data.
     *
     * The default implementation deep-copies the managed fields.
     *
     * @param source Object to copy.
     * @param fields Fields to copy.
     * @returns An independent copy of the source.
     */
    copy?: (
        source: TData,
        fields: readonly (keyof TData)[],
    ) => TData;

    /**
     * Custom persistence function.
     *
     * When provided, this function is responsible for synchronizing
     * the source object with the persisted data.
     *
     * @param data Snapshot of the edited data.
     * @param source Original source object.
     * @returns The persistence operation result.
     */
    save?: (
        data: TData,
        source: TData,
    ) => Promise<unknown> | unknown;

    /** Called after a successful save. */
    onSave?: (result: unknown, data: TData) => void;

    /** Called after resetting the editor. */
    onReset?: (data: TData) => void;

    /** Called when an operation fails. */
    onError?: (
        error: unknown,
        context: EditorErrorContext<TData>,
    ) => void;

    /** Called when edited data changes. */
    onChange?: (data: TData) => void;
}

/**
 * Generic editor interface.
 */
export interface Editor<TData extends object> {
    /** Current editable data. */
    readonly data: TData;

    /** Initial data snapshot. */
    readonly original: Readonly<ShallowRef<TData>>;

    /** Whether editable data differs from the initial snapshot. */
    readonly isDirty: ComputedRef<boolean>;

    /** Whether a save operation is running. */
    readonly isSaving: Readonly<Ref<boolean>>;

    /** Current validation errors. */
    readonly errors: Readonly<Ref<EditorErrors>>;

    /**
     * Replaces the source object and resets the editor.
     *
     * @param source New source object.
     */
    setSource(source: TData): void;

    /** Restores the initial values and clears errors. */
    reset(): void;

    /**
     * Saves the current data.
     *
     * @returns The result of the persistence function.
     */
    save(): Promise<unknown>;

    /**
     * Replaces the current validation errors.
     *
     * @param errors Normalized errors.
     * @param data Data snapshot associated with the errors.
     */
    setErrors(errors: EditorErrors, data?: TData): void;

    /**
     * Clears all errors or errors associated with one field.
     *
     * @param field Optional field name.
     */
    clearErrors(field?: keyof TData): void;
}

/**
 * Copies the selected fields while preserving the source prototype.
 *
 * @param source Object to copy.
 * @param fields Fields to copy.
 * @returns A new object containing independent copies of the selected fields.
 */
function defaultCopy<TData extends object>(
    source: TData,
    fields: readonly (keyof TData)[],
): TData {
    const result = Object.create(Object.getPrototypeOf(source)) as TData;

    for (const field of fields) {
        if (field in source) {
            Reflect.set(result, field, cloneDeep(Reflect.get(source, field)));
        }
    }

    return result;
}

/**
 * Copies selected fields from one object into another.
 *
 * Properties missing from the source are removed from the target.
 *
 * @param target Object to update.
 * @param source Object providing the values.
 * @param fields Fields to synchronize.
 */
function copyFields<TData extends object>(
    target: TData,
    source: TData,
    fields: readonly (keyof TData)[],
): void {
    for (const field of fields) {
        if (field in source) {
            Reflect.set(target, field, cloneDeep(Reflect.get(source, field)));
        } else {
            Reflect.deleteProperty(target, field);
        }
    }
}

/**
 * Creates a generic editor for an arbitrary data object.
 *
 * The editor maintains an independent reactive copy of the selected fields.
 * It does not require a Model, Repository or API client.
 *
 * @param initialSource Initial source object.
 * @param options Editor configuration.
 * @returns A reactive editor instance.
 */
export function useEditor<TData extends object>(
    initialSource: TData,
    options: EditorOptions<TData>,
): Editor<TData> {
    const { fields } = options;

    const copy = options.copy ?? defaultCopy;

    const source = shallowRef(initialSource);
    const original = shallowRef(copy(initialSource, fields));
    const data = reactive(copy(initialSource, fields)) as TData;

    const isSaving = ref(false);
    const errors = ref<EditorErrors>({});

    const errorSnapshots = new Map<string, unknown>();

    let sourceVersion = 0;
    let dataVersion = 0;
    let suppressWatch = false;

    /**
     * Creates an independent copy using the configured copy function.
     *
     * @param value Object to copy.
     * @returns Copied object.
     */
    function createCopy(value: TData): TData {
        return copy(value, fields);
    }

    /**
     * Replaces managed properties without replacing the reactive object.
     *
     * @param target Object to update.
     * @param value Object providing the values.
     */
    function updateData(target: TData, value: TData): void {
        suppressWatch = true;

        try {
            copyFields(target, value, fields);
        } finally {
            suppressWatch = false;
        }
    }

    /**
     * Removes empty error collections.
     */
    function normalizeErrors(): void {
        if (errors.value.fields && Object.keys(errors.value.fields).length === 0) {
            delete errors.value.fields;
        }

        if (errors.value.global?.length === 0) {
            delete errors.value.global;
        }
    }

    /**
     * Replaces all current errors.
     *
     * @param value Normalized errors.
     * @param snapshot Data associated with the errors.
     */
    function applyErrors(value: EditorErrors, snapshot: TData): void {
        const fieldsErrors: Record<string, string[]> = {};

        errorSnapshots.clear();

        for (const [field, messages] of Object.entries(value.fields ?? {})) {
            const normalized = Array.isArray(messages) ? messages : [messages];

            if (normalized.length === 0) {
                continue;
            }

            fieldsErrors[field] = [...normalized];

            if (fields.some((name) => String(name) === field)) {
                errorSnapshots.set(field, cloneDeep(
                    Reflect.get(snapshot, field),
                ));
            }
        }

        errors.value = {};

        if (Object.keys(fieldsErrors).length > 0) {
            errors.value.fields = fieldsErrors;
        }

        if (value.global?.length) {
            errors.value.global = [...value.global];
        }
    }

    /**
     * Removes errors associated with a field.
     *
     * @param field Field name.
     */
    function removeFieldErrors(field: string): void {
        if (errors.value.fields) {
            delete errors.value.fields[field];
        }

        errorSnapshots.delete(field);
        normalizeErrors();
    }

    /**
     * Handles changes to the editable data.
     */
    watch(
        () => fields.map((field) => data[field]),
        () => {
            if (suppressWatch) {
                return;
            }

            dataVersion++;

            for (const [field, snapshot] of errorSnapshots) {
                if (!isEqual(Reflect.get(data, field), snapshot)) {
                    removeFieldErrors(field);
                }
            }

            options.onChange?.(data);
        },
        {
            deep: true,
            flush: 'sync',
        },
    );

    const isDirty = computed(() => {
        return fields.some((field) => {
            return !isEqual(data[field], original.value[field]);
        });
    });

    /**
     * Replaces the current source and resets the editor.
     *
     * An ongoing save operation continues against its original source,
     * without modifying the state associated with the new source.
     *
     * @param newSource New source object.
     */
    function setSource(newSource: TData): void {
        sourceVersion++;
        dataVersion++;

        source.value = newSource;

        const snapshot = createCopy(newSource);

        original.value = snapshot;
        updateData(data, snapshot);

        clearErrors();
    }

    /**
     * Restores the initial values and clears all errors.
     */
    function reset(): void {
        dataVersion++;

        updateData(data, original.value);
        clearErrors();

        options.onReset?.(data);
    }

    /**
     * Replaces the current validation errors.
     *
     * Errors are associated with the supplied data snapshot.
     * If no snapshot is supplied, the current editable data is used.
     *
     * @param value Normalized errors.
     * @param snapshot Data associated with the errors.
     */
    function setErrors(value: EditorErrors, snapshot?: TData): void {
        applyErrors(value, snapshot ?? createCopy(data));
    }

    /**
     * Clears all errors or errors associated with one field.
     *
     * @param field Optional field name.
     */
    function clearErrors(field?: keyof TData): void {
        if (field === undefined) {
            errorSnapshots.clear();
            errors.value = {};
            return;
        }

        removeFieldErrors(String(field));
    }

    /**
     * Saves the current data snapshot.
     *
     * Only one save operation can run at a time. Changing the source while
     * saving is allowed; the result of an outdated operation cannot modify
     * the state of the newly selected source.
     *
     * @returns The persistence function result.
     * @throws Error if another save operation is already running.
     */
    async function save(): Promise<unknown> {
        if (isSaving.value) {
            throw new Error('An editor save operation is already running.');
        }

        const submittedData = createCopy(data);
        const submittedSource = source.value;

        const currentSourceVersion = sourceVersion;
        const currentDataVersion = dataVersion;

        isSaving.value = true;

        let result: unknown;

        try {
            if (options.save)
                result = await options.save(submittedData, submittedSource);
            else
                copyFields(submittedSource, submittedData, fields);

            if (sourceVersion === currentSourceVersion) {
                original.value = createCopy(submittedSource);

                if (!options.save && dataVersion === currentDataVersion)
                    updateData(data, original.value);
            }
        } catch (error) {
            options.onError?.(error, {
                source: submittedSource,
                data: submittedData,
                setErrors: (value) => {
                    if (sourceVersion === currentSourceVersion) {
                        setErrors(value, submittedData);
                    }
                },
            });

            throw error;
        } finally {
            isSaving.value = false;
        }

        options.onSave?.(result, submittedData);

        return result;
    }

    return {
        data,
        original,
        isDirty,
        isSaving,
        errors,
        setSource,
        reset,
        save,
        setErrors,
        clearErrors,
    };
}

