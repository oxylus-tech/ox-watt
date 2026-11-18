
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import type { Editor } from "@tiptap/core";

import OwRichTextEditor from "@ox-watt/content/components/OwRichTextEditor.vue";
import { EditorContent } from "@tiptap/vue-3";

/**
 * Mounted editor component wrapper.
 */
type EditorWrapper = VueWrapper<InstanceType<typeof OwRichTextEditor>>;

/**
 * Retrieves the exposed TipTap editor instance.
 *
 * @param wrapper - Mounted editor component.
 * @returns The TipTap editor instance.
 * @throws Error when the editor has not been initialized.
 */
function getEditor(wrapper: EditorWrapper): Editor {
    const editor = wrapper.vm.editor;

    if (!editor) {
        throw new Error("The editor has not been initialized.");
    }

    return editor;
}

/**
 * Unmounts all mounted wrappers after each test.
 */
const wrappers: EditorWrapper[] = [];

afterEach(() => {
    for (const wrapper of wrappers) {
        wrapper.unmount();
    }

    wrappers.length = 0;
    vi.restoreAllMocks();
});

/**
 * Mounts the editor component and tracks its wrapper for cleanup.
 *
 * @param props - Component properties.
 * @returns The mounted component wrapper.
 */
function mountEditor(props: Record<string, unknown> = {}): EditorWrapper {
    const wrapper = mount(OwRichTextEditor, { props });

    wrappers.push(wrapper);

    return wrapper;
}

describe("OwRichTextEditor", () => {
    describe("initialization", () => {
        it("should create the editor when the component is mounted", () => {
            const wrapper = mountEditor();

            expect(wrapper.vm.editor).not.toBeNull();
            expect(getEditor(wrapper).isDestroyed).toBe(false);
        });

        it("should render the TipTap editor content", async () => {
            const wrapper = mountEditor();
            const editor = getEditor(wrapper);

            expect(editor.view.dom.getAttribute("contenteditable")).toBe("true");
            expect(editor.view.dom.classList.contains("ProseMirror")).toBe(true);
        });

        it("should initialize the editor with the model value", async () => {
            const wrapper = mountEditor({
                modelValue: "<p>Hello world!</p>",
            });

            await nextTick();

            expect(getEditor(wrapper).getHTML()).toBe("<p>Hello world!</p>");
        });

        it("should initialize an empty editor when the model value is null", () => {
            const wrapper = mountEditor({
                modelValue: null,
            });

            expect(getEditor(wrapper).getHTML()).toBe("<p></p>");
        });

        it("should expose the editor context and commands", () => {
            const wrapper = mountEditor();

            expect(wrapper.vm.context).toBeDefined();
            expect(wrapper.vm.commands).toBe(wrapper.vm.context.commands);
            expect(wrapper.vm.register).toBe(wrapper.vm.context.register);
            expect(wrapper.vm.reset).toBe(wrapper.vm.context.reset);
        });
    });

    describe("v-model", () => {
        it("should emit update:modelValue when the editor content changes", async () => {
            const wrapper = mountEditor();
            const editor = getEditor(wrapper);

            editor.commands.setContent("<p>Updated content</p>");

            await nextTick();

            expect(wrapper.emitted("update:modelValue")).toBeDefined();
            expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([
                "<p>Updated content</p>",
            ]);
        });

        it("should update the editor when the external model changes", async () => {
            const wrapper = mountEditor({
                modelValue: "<p>Initial content</p>",
            });

            await wrapper.setProps({
                modelValue: "<p>External update</p>",
            });

            await nextTick();

            expect(getEditor(wrapper).getHTML()).toBe("<p>External update</p>");
        });

        it("should not emit update:modelValue when the external model changes", async () => {
            const wrapper = mountEditor({
                modelValue: "<p>Initial content</p>",
            });

            await wrapper.setProps({
                modelValue: "<p>External update</p>",
            });

            await nextTick();

            expect(wrapper.emitted("update:modelValue")).toBeUndefined();
        });
    });

    describe("editable state", () => {
        it("should allow editing by default", () => {
            const wrapper = mountEditor();

            expect(getEditor(wrapper).isEditable).toBe(true);
        });

        it("should disable editing when disabled is true", () => {
            const wrapper = mountEditor({
                disabled: true,
            });

            expect(getEditor(wrapper).isEditable).toBe(false);
        });

        it("should disable editing when readonly is true", () => {
            const wrapper = mountEditor({
                readonly: true,
            });

            expect(getEditor(wrapper).isEditable).toBe(false);
        });

        it("should update the editable state when disabled changes", async () => {
            const wrapper = mountEditor();

            expect(getEditor(wrapper).isEditable).toBe(true);

            await wrapper.setProps({
                disabled: true,
            });

            expect(getEditor(wrapper).isEditable).toBe(false);

            await wrapper.setProps({
                disabled: false,
            });

            expect(getEditor(wrapper).isEditable).toBe(true);
        });

        it("should update the editable state when readonly changes", async () => {
            const wrapper = mountEditor();

            expect(getEditor(wrapper).isEditable).toBe(true);

            await wrapper.setProps({
                readonly: true,
            });

            expect(getEditor(wrapper).isEditable).toBe(false);

            await wrapper.setProps({
                readonly: false,
            });

            expect(getEditor(wrapper).isEditable).toBe(true);
        });

        it("should preserve editorOptions.editable when it is false", () => {
            const wrapper = mountEditor({
                editorOptions: {
                    editable: false,
                },
            });

            expect(getEditor(wrapper).isEditable).toBe(false);
        });

        it("should not enable editing when editorOptions.editable is false and disabled changes", async () => {
            const wrapper = mountEditor({
                editorOptions: {
                    editable: false,
                },
            });

            await wrapper.setProps({
                disabled: true,
            });

            await wrapper.setProps({
                disabled: false,
            });

            expect(getEditor(wrapper).isEditable).toBe(false);
        });
    });

    describe("editor options", () => {
        it("should forward additional editor options", () => {
            const onFocus = vi.fn();

            const wrapper = mountEditor({
                editorOptions: {
                    onFocus,
                },
            });

            getEditor(wrapper).commands.focus();

            expect(getEditor(wrapper).options.onFocus).toBe(onFocus);
        });

        it("should invoke the configured onUpdate callback", () => {
            const onUpdate = vi.fn();

            const wrapper = mountEditor({
                editorOptions: {
                    onUpdate,
                },
            });

            getEditor(wrapper).commands.setContent("<p>Updated</p>");

            expect(onUpdate).toHaveBeenCalled();
        });
    });

    describe("toolsets", () => {
        it("should register initial toolsets", () => {
            const toolset = {
                name: "test-toolset",
                extensions: [],
            };

            const wrapper = mountEditor({
                toolsets: [toolset],
            });

            expect(wrapper.vm.context.toolsets.get(toolset.name)).toBe(toolset);
        });

        it("should expose the register method", () => {
            const wrapper = mountEditor();

            const toolset = {
                name: "dynamic-toolset",
                extensions: [],
            };

            const unregister = wrapper.vm.register(toolset);

            expect(wrapper.vm.context.toolsets.get(toolset.name)).toBe(toolset);

            unregister();

            expect(wrapper.vm.context.toolsets.has(toolset.name)).toBe(false);
        });

        it("should unregister toolsets when the component is unmounted", () => {
            const toolset = {
                name: "test-toolset",
                extensions: [],
            };

            const wrapper = mountEditor({
                toolsets: [toolset],
            });

            const context = wrapper.vm.context;

            wrapper.unmount();

            expect(context.toolsets.size).toBe(0);
        });
    });

    describe("lifecycle", () => {
        it("should destroy the editor when the component is unmounted", () => {
            const wrapper = mountEditor();
            const editor = getEditor(wrapper);

            wrapper.unmount();

            expect(editor.isDestroyed).toBe(true);
        });
    });
});
