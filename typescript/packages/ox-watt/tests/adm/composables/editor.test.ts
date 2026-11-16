import { describe, expect, it, vi } from "vitest";

import { useEditor } from "@/adm/composables/editor";
import type {
    EditorErrorContext,
    EditorOptions,
} from "@/adm/composables/editor";

/**
 * Data structure used by the editor tests.
 */
interface TestData {
    name: string;
    profile: {
        city: string;
    };
    tags: string[];
    untouched?: string;
}

/**
 * Creates a fresh test data object.
 *
 * @param overrides Optional values overriding the defaults.
 * @returns A new test data object.
 */
function createData(overrides: Partial<TestData> = {}): TestData {
    return {
        name: "Alice",
        profile: {
            city: "Brussels",
        },
        tags: ["admin"],
        untouched: "unchanged",
        ...overrides,
    };
}

/**
 * Creates a deferred promise for asynchronous operation tests.
 *
 * @returns The promise and its resolve/reject functions.
 */
function deferred<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;

    const promise = new Promise<T>((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });

    return {
        promise,
        resolve,
        reject,
    };
}

const fields = ["name", "profile", "tags"] as const;

describe("useEditor", () => {
    describe("initialization", () => {
        it("creates an independent copy of the selected fields", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            expect(editor.data).not.toBe(source);
            expect(editor.original.value).not.toBe(source);

            expect(editor.data).toEqual({
                name: "Alice",
                profile: {
                    city: "Brussels",
                },
                tags: ["admin"],
            });

            expect(editor.original.value).toEqual(editor.data);
        });

        it("deep-copies nested objects and arrays", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            editor.data.profile.city = "Paris";
            editor.data.tags.push("editor");

            expect(source.profile.city).toBe("Brussels");
            expect(source.tags).toEqual(["admin"]);

            expect(editor.original.value.profile.city).toBe("Brussels");
            expect(editor.original.value.tags).toEqual(["admin"]);
        });

        it("does not copy fields outside the selected fields", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            expect(editor.data.untouched).toBeUndefined();
            expect(editor.original.value.untouched).toBeUndefined();
        });

        it("uses a custom copy function when provided", () => {
            const source = createData();
            const copy = vi.fn((value: TestData) => ({
                name: value.name.toUpperCase(),
                profile: {
                    city: value.profile.city,
                },
                tags: [...value.tags],
            }));

            const editor = useEditor(source, {
                fields,
                copy,
            });

            expect(copy).toHaveBeenCalledWith(source, fields);
            expect(editor.data.name).toBe("ALICE");
            expect(editor.original.value.name).toBe("ALICE");
        });

        it("initializes the dirty state to false", () => {
            const editor = useEditor(createData(), { fields });

            expect(editor.isDirty.value).toBe(false);
        });

        it("initializes the saving state to false", () => {
            const editor = useEditor(createData(), { fields });

            expect(editor.isSaving.value).toBe(false);
        });

        it("initializes with no errors", () => {
            const editor = useEditor(createData(), { fields });

            expect(editor.errors.value).toEqual({});
        });
    });

    describe("dirty state", () => {
        it("detects changes to top-level fields", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.name = "Bob";

            expect(editor.isDirty.value).toBe(true);
        });

        it("detects changes to nested fields", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.profile.city = "Paris";

            expect(editor.isDirty.value).toBe(true);
        });

        it("detects additions to nested arrays", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.tags.push("editor");

            expect(editor.isDirty.value).toBe(true);
        });

        it("ignores changes to fields outside the selected fields", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            source.untouched = "modified";

            expect(editor.isDirty.value).toBe(false);
        });

        it("becomes clean when values are restored", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.name = "Bob";
            expect(editor.isDirty.value).toBe(true);

            editor.data.name = "Alice";
            expect(editor.isDirty.value).toBe(false);
        });

        it("uses deep equality for nested values", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.profile = {
                city: "Paris",
            };

            expect(editor.isDirty.value).toBe(true);

            editor.data.profile = {
                city: "Brussels",
            };

            expect(editor.isDirty.value).toBe(false);
        });
    });

    describe("reset", () => {
        it("restores the original values", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.name = "Bob";
            editor.data.profile.city = "Paris";
            editor.data.tags.push("editor");

            editor.reset();

            expect(editor.data).toEqual({
                name: "Alice",
                profile: {
                    city: "Brussels",
                },
                tags: ["admin"],
            });

            expect(editor.isDirty.value).toBe(false);
        });

        it("preserves the reactive data object reference", () => {
            const editor = useEditor(createData(), { fields });
            const data = editor.data;

            editor.data.name = "Bob";
            editor.reset();

            expect(editor.data).toBe(data);
        });

        it("does not modify the source object", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            editor.data.name = "Bob";
            editor.reset();

            expect(source.name).toBe("Alice");
        });

        it("clears validation errors", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                },
                global: ["Operation failed."],
            });

            editor.reset();

            expect(editor.errors.value).toEqual({});
        });

        it("calls onReset after restoring the data", () => {
            const onReset = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onReset,
            });

            editor.data.name = "Bob";
            editor.reset();

            expect(onReset).toHaveBeenCalledOnce();
            expect(onReset).toHaveBeenCalledWith(editor.data);
            expect(onReset.mock.calls[0][0].name).toBe("Alice");
        });

        it("does not call onReset when the data is already clean", () => {
            const onReset = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onReset,
            });

            editor.reset();

            expect(onReset).toHaveBeenCalledOnce();
        });
    });

    describe("setSource", () => {
        it("replaces the source and resets the edited data", () => {
            const editor = useEditor(createData(), { fields });
            const nextSource = createData({
                name: "Bob",
                profile: {
                    city: "Paris",
                },
            });

            editor.data.name = "Charlie";
            editor.setSource(nextSource);

            expect(editor.data.name).toBe("Bob");
            expect(editor.data.profile.city).toBe("Paris");
            expect(editor.original.value.name).toBe("Bob");
            expect(editor.isDirty.value).toBe(false);
        });

        it("preserves the reactive data object reference", () => {
            const editor = useEditor(createData(), { fields });
            const data = editor.data;

            editor.setSource(createData({ name: "Bob" }));

            expect(editor.data).toBe(data);
        });

        it("clears validation errors", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                },
                global: ["Operation failed."],
            });

            editor.setSource(createData({ name: "Bob" }));

            expect(editor.errors.value).toEqual({});
        });

        it("does not call onReset", () => {
            const onReset = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onReset,
            });

            editor.setSource(createData({ name: "Bob" }));

            expect(onReset).not.toHaveBeenCalled();
        });

        it("does not modify the previous source", () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            editor.setSource(createData({ name: "Bob" }));
            editor.data.name = "Charlie";

            expect(source.name).toBe("Alice");
        });
    });

    describe("save", () => {
        it("updates the source using the selected fields by default", async () => {
            const source = createData();
            const editor = useEditor(source, { fields });

            editor.data.name = "Bob";
            editor.data.profile.city = "Paris";

            await editor.save();

            expect(source.name).toBe("Bob");
            expect(source.profile.city).toBe("Paris");
            expect(source.untouched).toBe("unchanged");
            expect(editor.isDirty.value).toBe(false);
        });

        it("returns the result of the custom save function", async () => {
            const source = createData();
            const result = {
                id: 42,
                status: "saved",
            };

            const save = vi.fn(() => result);
            const editor = useEditor(source, {
                fields,
                save,
            });

            editor.data.name = "Bob";

            await expect(editor.save()).resolves.toBe(result);

            expect(save).toHaveBeenCalledOnce();
            expect(save).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: "Bob",
                }),
                source,
                expect.objectContaining({
                    defaultSave: expect.any(Function)
                })
            );
        });

        it("does not automatically update the source when using a custom save function", async () => {
            const source = createData();
            const editor = useEditor(source, {
                fields,
                save: vi.fn(),
            });

            editor.data.name = "Bob";
            await editor.save();

            expect(source.name).toBe("Alice");
            expect(editor.isDirty.value).toBe(true);
        });

        it("calls onSave after a successful save", async () => {
            const onSave = vi.fn();
            const result = { status: "saved" };

            const editor = useEditor(createData(), {
                fields,
                save: () => result,
                onSave,
            });

            editor.data.name = "Bob";

            await editor.save();

            expect(onSave).toHaveBeenCalledOnce();
            expect(onSave).toHaveBeenCalledWith(
                result,
                expect.objectContaining({
                    name: "Bob",
                }),
            );
        });

        it("passes an independent snapshot to the custom save function", async () => {
            const source = createData();
            const save = vi.fn();

            const editor = useEditor(source, {
                fields,
                save,
            });

            editor.data.profile.city = "Paris";

            await editor.save();

            const submittedData = save.mock.calls[0][0];

            expect(submittedData).not.toBe(editor.data);
            expect(submittedData.profile).not.toBe(editor.data.profile);
            expect(submittedData.profile.city).toBe("Paris");
        });

        it("sets isSaving while the save operation is pending", async () => {
            const request = deferred<void>();

            const editor = useEditor(createData(), {
                fields,
                save: () => request.promise,
            });

            const saving = editor.save();

            expect(editor.isSaving.value).toBe(true);

            request.resolve();
            await saving;

            expect(editor.isSaving.value).toBe(false);
        });

        it("rejects concurrent save operations", async () => {
            const request = deferred<void>();

            const editor = useEditor(createData(), {
                fields,
                save: () => request.promise,
            });

            const firstSave = editor.save();

            await expect(editor.save()).rejects.toThrow(
                "An editor save operation is already running.",
            );

            request.resolve();
            await firstSave;
        });

        it("preserves modifications made while saving", async () => {
            const request = deferred<void>();
            const source = createData();

            const editor = useEditor(source, {
                fields,
                save: async (data, target) => {
                    await request.promise;
                    target.name = data.name;
                },
            });

            editor.data.name = "Bob";

            const saving = editor.save();

            editor.data.name = "Charlie";

            request.resolve();
            await saving;

            expect(source.name).toBe("Bob");
            expect(editor.original.value.name).toBe("Bob");
            expect(editor.data.name).toBe("Charlie");
            expect(editor.isDirty.value).toBe(true);
        });

        it("becomes clean after saving when no further modifications occur", async () => {
            const source = createData();

            const editor = useEditor(source, { fields });

            editor.data.name = "Bob";
            await editor.save();

            expect(editor.data.name).toBe("Bob");
            expect(editor.original.value.name).toBe("Bob");
            expect(editor.isDirty.value).toBe(false);
        });

        it("does not update the new source after changing source during save", async () => {
            const request = deferred<void>();
            const previousSource = createData();
            const nextSource = createData({ name: "Charlie" });

            const editor = useEditor(previousSource, {
                fields,
                save: async (data, source) => {
                    await request.promise;
                    source.name = data.name;
                },
            });

            editor.data.name = "Bob";

            const saving = editor.save();

            editor.setSource(nextSource);

            request.resolve();
            await saving;

            expect(previousSource.name).toBe("Bob");
            expect(nextSource.name).toBe("Charlie");
            expect(editor.data.name).toBe("Charlie");
            expect(editor.original.value.name).toBe("Charlie");
            expect(editor.isDirty.value).toBe(false);
        });

        it("resets isSaving when the save operation fails", async () => {
            const error = new Error("Save failed.");

            const editor = useEditor(createData(), {
                fields,
                save: () => Promise.reject(error),
            });

            await expect(editor.save()).rejects.toBe(error);

            expect(editor.isSaving.value).toBe(false);
        });

        it('provides defaultSave to a custom save callback', async () => {
            const source = {
                name: 'Original',
            };
            const save = vi.fn();

            const editor = useEditor(source, {
                fields: ['name'],
                save,
            });

            editor.data.name = 'Updated';

            await editor.save();

            expect(save).toHaveBeenCalledOnce();

            const [, , context] = save.mock.calls[0];

            expect(context.defaultSave).toEqual(expect.any(Function));
        });

        it('does not apply the default save when a custom save does not call defaultSave', async () => {
            const source = {
                name: 'Original',
            };
            const save = vi.fn();

            const editor = useEditor(source, {
                fields: ['name'],
                save,
            });

            editor.data.name = 'Updated';

            await editor.save();

            expect(source.name).toBe('Original');
            expect(editor.data.name).toBe('Updated');
            expect(editor.isDirty.value).toBe(true);
        });

        it('applies the default save when requested by a custom save callback', async () => {
            const source = {
                name: 'Original',
            };

            const save = vi.fn((_data, _source, context) => {
                context.defaultSave();
            });

            const editor = useEditor(source, {
                fields: ['name'],
                save,
            });

            editor.data.name = 'Updated';

            await editor.save();

            expect(source.name).toBe('Updated');
            expect(editor.isDirty.value).toBe(false);
        });

        it('allows defaultSave to use a custom synchronization function', async () => {
            const source = {
                name: 'Original',
            };

            const save = vi.fn((data, target, context) => {
                context.defaultSave(() => {
                    target.name = data.name.toUpperCase();
                });
            });

            const editor = useEditor(source, {
                fields: ['name'],
                save,
            });

            editor.data.name = 'Updated';

            await editor.save();

            expect(source.name).toBe('UPDATED');
            expect(editor.isDirty.value).toBe(true);
        });

        it('does not overwrite editor data changed during a custom save', async () => {
            const source = {
                name: 'Original',
            };

            const editor = useEditor(source, {
                fields: ['name'],
                save: async (_data, _source, context) => {
                    context.defaultSave();
                },
            });

            editor.data.name = 'Submitted';

            await editor.save();

            expect(source.name).toBe('Submitted');
            expect(editor.data.name).toBe('Submitted');
            expect(editor.isDirty.value).toBe(false);
        });
    });

    describe("errors", () => {
        it("sets field errors", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                    "profile.city": ["Invalid city."],
                },
            });

            expect(editor.errors.value.fields).toEqual({
                name: ["Invalid name."],
                "profile.city": ["Invalid city."],
            });
        });

        it("sets global errors", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                global: ["Operation failed."],
            });

            expect(editor.errors.value.global).toEqual([
                "Operation failed.",
            ]);
        });

        it("associates errors with the current data by default", () => {
            const editor = useEditor(createData(), { fields });

            editor.data.name = "Bob";

            editor.setErrors({
                fields: {
                    name: ["Name already exists."],
                },
            });

            editor.data.name = "Charlie";

            expect(editor.errors.value.fields?.name).toBeUndefined();
        });

        it("associates errors with an explicitly supplied data snapshot", () => {
            const editor = useEditor(createData(), { fields });
            const submittedData = createData({ name: "Bob" });

            editor.data.name = "Charlie";

            editor.setErrors(
                {
                    fields: {
                        name: ["Name already exists."],
                    },
                },
                submittedData,
            );

            expect(editor.errors.value.fields?.name).toEqual([
                "Name already exists.",
            ]);

            editor.data.name = "David";

            expect(editor.errors.value.fields?.name).toBeUndefined();
        });

        it("preserves errors while their field values remain unchanged", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                    "profile.city": ["Invalid city."],
                },
            });

            editor.data.name = "Bob";

            expect(editor.errors.value.fields).toEqual({
                "profile.city": ["Invalid city."],
            });
        });

        it("does not clear global errors when a field changes", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                },
                global: ["Operation failed."],
            });

            editor.data.name = "Bob";

            expect(editor.errors.value.fields?.name).toBeUndefined();
            expect(editor.errors.value.global).toEqual([
                "Operation failed.",
            ]);
        });

        it("does not restore an error when the original value is entered again", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                },
            });

            editor.data.name = "Bob";

            expect(editor.errors.value.fields?.name).toBeUndefined();

            editor.data.name = "Alice";

            expect(editor.errors.value.fields?.name).toBeUndefined();
        });

        it("clears all errors", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                },
                global: ["Operation failed."],
            });

            editor.clearErrors();

            expect(editor.errors.value).toEqual({});
        });

        it("clears errors associated with a single field", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                fields: {
                    name: ["Invalid name."],
                    "profile.city": ["Invalid city."],
                },
                global: ["Operation failed."],
            });

            editor.clearErrors("name");

            expect(editor.errors.value).toEqual({
                fields: {
                    "profile.city": ["Invalid city."],
                },
                global: ["Operation failed."],
            });
        });

        it("does not clear global errors when clearing a field", () => {
            const editor = useEditor(createData(), { fields });

            editor.setErrors({
                global: ["Operation failed."],
            });

            editor.clearErrors("name");

            expect(editor.errors.value.global).toEqual([
                "Operation failed.",
            ]);
        });
    });

    describe("error handling", () => {
        it("calls onError when saving fails", async () => {
            const error = new Error("Save failed.");
            const onError = vi.fn();

            const editor = useEditor(createData(), {
                fields,
                save: () => Promise.reject(error),
                onError,
            });

            await expect(editor.save()).rejects.toBe(error);

            expect(onError).toHaveBeenCalledOnce();
            expect(onError).toHaveBeenCalledWith(
                error,
                expect.objectContaining({
                    source: expect.any(Object),
                    data: expect.any(Object),
                    setErrors: expect.any(Function),
                }),
            );
        });

        it("provides the submitted snapshot to onError", async () => {
            const error = new Error("Save failed.");
            const source = createData();

            const editor = useEditor(source, {
                fields,
                save: () => Promise.reject(error),
                onError: (_error, context) => {
                    expect(context.source).toBe(source);
                    expect(context.data.name).toBe("Bob");
                },
            });

            editor.data.name = "Bob";

            await expect(editor.save()).rejects.toBe(error);
        });

        it("allows onError to set server validation errors", async () => {
            const error = new Error("Validation failed.");

            const editor = useEditor(createData(), {
                fields,
                save: () => Promise.reject(error),
                onError: (
                    _error: unknown,
                    context: EditorErrorContext<TestData>,
                ) => {
                    context.setErrors({
                        fields: {
                            name: ["Name already exists."],
                        },
                    });
                },
            });

            editor.data.name = "Bob";

            await expect(editor.save()).rejects.toBe(error);

            expect(editor.errors.value.fields?.name).toEqual([
                "Name already exists.",
            ]);

            editor.data.name = "Charlie";

            expect(editor.errors.value.fields?.name).toBeUndefined();
        });

        it("does not apply errors from a save operation after changing source", async () => {
            const request = deferred<void>();
            const error = new Error("Validation failed.");
            const nextSource = createData({ name: "Charlie" });

            const editor = useEditor(createData(), {
                fields,
                save: async () => {
                    await request.promise;
                    throw error;
                },
                onError: (
                    _error: unknown,
                    context: EditorErrorContext<TestData>,
                ) => {
                    context.setErrors({
                        fields: {
                            name: ["Name already exists."],
                        },
                    });
                },
            });

            editor.data.name = "Bob";

            const saving = editor.save();

            editor.setSource(nextSource);

            request.resolve();

            await expect(saving).rejects.toBe(error);

            expect(editor.errors.value).toEqual({});
        });
    });

    describe("change events", () => {
        it("calls onChange when a field changes", () => {
            const onChange = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onChange,
            });

            editor.data.name = "Bob";

            expect(onChange).toHaveBeenCalledOnce();
            expect(onChange).toHaveBeenCalledWith(editor.data);
        });

        it("calls onChange when a nested field changes", () => {
            const onChange = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onChange,
            });

            editor.data.profile.city = "Paris";

            expect(onChange).toHaveBeenCalledOnce();
            expect(onChange).toHaveBeenCalledWith(editor.data);
        });

        it("calls onChange when an array changes", () => {
            const onChange = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onChange,
            });

            editor.data.tags.push("editor");

            expect(onChange).toHaveBeenCalledOnce();
        });

        it("does not call onChange when resetting the editor", () => {
            const onChange = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onChange,
            });

            editor.data.name = "Bob";
            onChange.mockClear();

            editor.reset();

            expect(onChange).not.toHaveBeenCalled();
        });

        it("does not call onChange when changing the source", () => {
            const onChange = vi.fn();
            const editor = useEditor(createData(), {
                fields,
                onChange,
            });

            editor.setSource(createData({ name: "Bob" }));

            expect(onChange).not.toHaveBeenCalled();
        });
    });
});

