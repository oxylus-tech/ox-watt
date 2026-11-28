import { defineComponent, h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

import OwRichTextEditor from "../../src/components/OwRichTextEditor.vue";
import { createMinimalSchemaExtensions, createTestExtension } from "../fixtures/editor"


/**
 * Mounts the rich-text editor with its content component stubbed.
 *
 * @param options - Vue Test Utils mounting options.
 * @returns A mounted rich-text editor wrapper.
 */
function mountRichTextEditor(options = {}) {
    return mount(OwRichTextEditor, {
        ...options,
        global: {
            ...options.global,
            stubs: {
                ...options.global?.stubs,
                EditorContent: true,
            },
        },
    });
}


describe("OwRichTextEditor", () => {
    it("should create an editor when mounted", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        expect(wrapper.vm.editor).toBeInstanceOf(Editor);
        expect(wrapper.find(".ow-rich-text-editor").exists()).toBe(true);

        wrapper.unmount();
    });

    it("should render the editor content", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                modelValue: "<p>Hello world</p>",
            },
        });

        await nextTick();

        expect(wrapper.vm.editor).toBeInstanceOf(Editor);
        expect(wrapper.vm.editor.getHTML()).toContain("Hello world");

        wrapper.unmount();
    });

    it("should initialize with StarterKit by default", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        const editor = wrapper.vm.editor;

        expect(editor.extensionManager.extensions)
            .toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "paragraph",
                    }),
                    expect.objectContaining({
                        name: "bold",
                    }),
                ]),
            );

        wrapper.unmount();
    });

    it("should allow disabling StarterKit", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                starterKit: false,
                extensions: createMinimalSchemaExtensions(),
            },
        });

        await nextTick();

        const extensions = wrapper.vm.editor.extensionManager.extensions;
        const names = extensions.map((extension) => extension.name);

        /*expect(
            extensions.some((extension) => extension.name === "paragraph"),
        ).toBe(false);*/
        expect(names).not.toContain("bold");

        wrapper.unmount();
    });

    it("should register custom extensions", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                extensions: [createTestExtension()],
            },
        });

        await nextTick();

        expect(
            wrapper.vm.editor.extensionManager.extensions.some(
                (extension) => extension.name === "heading",
            ),
        ).toBe(true);

        wrapper.unmount();
    });

    it("should synchronize editor changes with v-model", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                modelValue: "<p>Initial content</p>",
            },
        });

        await nextTick();

        wrapper.vm.editor.commands.setContent("<p>Updated content</p>");
        await nextTick();

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();

        const emitted = wrapper.emitted("update:modelValue");
        expect(emitted?.at(-1)?.[0]).toContain("Updated content");

        wrapper.unmount();
    });

    it("should synchronize v-model changes with the editor", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                modelValue: "<p>Initial content</p>",
            },
        });

        await nextTick();

        await wrapper.setProps({
            modelValue: "<p>Updated from parent</p>",
        });

        await nextTick();

        expect(wrapper.vm.editor.getHTML())
            .toContain("Updated from parent");

        wrapper.unmount();
    });

    it("should create a named input when name is provided", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                name: "description",
                modelValue: "<p>Content</p>",
            },
        });

        await nextTick();

        const input = wrapper.get('input[name="description"]');

        expect(input.element.value).toBe("<p>Content</p>");

        wrapper.unmount();
    });

    it("should not render a named input when name is omitted", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        expect(wrapper.find("input").exists()).toBe(false);

        wrapper.unmount();
    });

    it("should initialize as non-editable when disabled", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                disabled: true,
            },
        });

        await nextTick();

        expect(wrapper.vm.editor.isEditable).toBe(false);
        expect(
            wrapper.find(".ow-rich-text-editor").classes(),
        ).toContain("is-disabled");

        wrapper.unmount();
    });

    it("should initialize as non-editable when readonly", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                readonly: true,
            },
        });

        await nextTick();

        expect(wrapper.vm.editor.isEditable).toBe(false);
        expect(
            wrapper.find(".ow-rich-text-editor").classes(),
        ).toContain("is-readonly");

        wrapper.unmount();
    });

    it("should synchronize the editable state when disabled changes", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        expect(wrapper.vm.editor.isEditable).toBe(true);

        await wrapper.setProps({
            disabled: true,
        });

        expect(wrapper.vm.editor.isEditable).toBe(false);

        await wrapper.setProps({
            disabled: false,
        });

        expect(wrapper.vm.editor.isEditable).toBe(true);

        wrapper.unmount();
    });

    it("should synchronize the editable state when readonly changes", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        await wrapper.setProps({ readonly: true, });

        expect(wrapper.vm.editor.isEditable).toBe(false);

        await wrapper.setProps({ readonly: false, });

        expect(wrapper.vm.editor.isEditable).toBe(true);

        wrapper.unmount();
    });

    it("should respect editorOptions.editable", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                editorOptions: {
                    editable: false,
                },
            },
        });

        await nextTick();

        expect(wrapper.vm.editor.isEditable).toBe(false);

        wrapper.unmount();
    });

    it("should expose the editor context", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        expect(wrapper.vm.context).toBeDefined();
        expect(wrapper.vm.context.editor).toBeDefined();
        expect(wrapper.vm.context.toolset).toBeDefined();

        wrapper.unmount();
    });

    it("should expose reset and run methods", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        expect(typeof wrapper.vm.reset).toBe("function");
        expect(typeof wrapper.vm.run).toBe("function");

        wrapper.unmount();
    });

    it("should preserve editor content when reset is called", async () => {
        const wrapper = mountRichTextEditor({
            props: {
                modelValue: "<p>Content to preserve</p>",
            },
        });

        await nextTick();

        const initialEditor = wrapper.vm.editor;

        wrapper.vm.reset();
        await nextTick();

        expect(wrapper.vm.editor).not.toBe(initialEditor);
        expect(wrapper.vm.editor.getHTML()).toContain(
            "Content to preserve",
        );

        wrapper.unmount();
    });

    it("should render the prepend and append slots", async () => {
        const wrapper = mountRichTextEditor({
            slots: {
                prepend: '<div data-testid="prepend">Prepend</div>',
                append: '<div data-testid="append">Append</div>',
            },
        });

        await nextTick();

        expect(wrapper.get('[data-testid="prepend"]').text())
            .toBe("Prepend");

        expect(wrapper.get('[data-testid="append"]').text())
            .toBe("Append");

        wrapper.unmount();
    });

    it("should expose editor and context to the default slot", async () => {
        const wrapper = mountRichTextEditor({
            slots: {
                default: `
                    <div data-testid="custom-content">
                        {{ !!editor }} - {{ !!context }}
                    </div>
                `,
            },
        });

        await nextTick();

        expect(wrapper.get('[data-testid="custom-content"]').text())
            .toBe("true - true");

        wrapper.unmount();
    });

    it("should destroy the editor when unmounted", async () => {
        const wrapper = mountRichTextEditor();

        await nextTick();

        const editor = wrapper.vm.editor;
        const destroy = vi.spyOn(editor, "destroy");

        wrapper.unmount();

        expect(destroy).toHaveBeenCalledOnce();
    });
});
