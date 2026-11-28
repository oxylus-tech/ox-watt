import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import type { RichTextContext, RichTextEditorOptions } from "../../src/types/editor";
import { useRichTextEditor } from "../../src/composables/editor";

import { createTestExtension } from "../fixtures";


/**
 * Mounts a component using the rich text editor composable.
 *
 * @param options - Rich text editor configuration.
 * @returns The mounted wrapper and editor context.
 */
function mountEditor(
    options: RichTextEditorOptions = {},
) {
    let context: RichTextContext | undefined;

    const component = defineComponent({
        setup() {
            context = useRichTextEditor(options);
            return () => h("div");
        },
    });

    const wrapper = mount(component);

    return {
        wrapper,
        context: context!,
    };
}


describe("useRichTextEditor", () => {
    it("should create the editor after mounting", async () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor();

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        expect(context).toBeDefined();
        expect(context!.editor.value).toBeDefined();

        wrapper.unmount();
    });

    it("should initialize StarterKit by default", () => {
        const { wrapper, context } = mountEditor();

        const names = context.editor.value!.extensionManager.extensions
            .map(extension => extension.name);

        expect(names).toContain("doc");
        expect(names).toContain("paragraph");
        expect(names).toContain("text");

        wrapper.unmount();
    });

    it("should include custom extensions", () => {
        const { wrapper, context } = mountEditor({
            extensions: [createTestExtension()],
        });

        const names = context.editor.value!.extensionManager.extensions
            .map(extension => extension.name);

        expect(names).toContain("testExtension");

        wrapper.unmount();
    });

    it("should apply editor options", () => {
        const { wrapper, context } = mountEditor({
            editorOptions: {
                editable: false,
                content: "<p>Initial content</p>",
            },
        });

        const editor = context.editor.value!;

        expect(editor.isEditable).toBe(false);
        expect(editor.getHTML()).toBe("<p>Initial content</p>");

        wrapper.unmount();
    });

    it("should expose a working command chain", () => {
        const { wrapper, context } = mountEditor();

        const chain = context.chain("insertContent", "Hello");

        expect(chain).toBeDefined();
        expect(chain!.run()).toBe(true);
        expect(context.editor.value!.getText()).toBe("Hello");

        wrapper.unmount();
    });

    it("should execute a command through runChain", () => {
        const { wrapper, context } = mountEditor();

        expect(context.runChain("insertContent", "Hello")).toBe(true);
        expect(context.editor.value!.getText()).toBe("Hello");

        wrapper.unmount();
    });

    it("should return false when running a chain without an editor", () => {
        const { wrapper, context } = mountEditor();

        context.editor.value!.destroy();
        context.editor.value = null;

        expect(context.chain("insertContent", "Hello")).toBeUndefined();
        expect(context.runChain("insertContent", "Hello")).toBe(false);

        wrapper.unmount();
    });

    it("should throw when using an unknown command", () => {
        const { wrapper, context } = mountEditor();

        expect(() => context.chain("unknownCommand")).toThrow(
            'Unknown TipTap chain command "unknownCommand".',
        );

        wrapper.unmount();
    });

    it("should reset the editor while preserving its content", () => {
        const { wrapper, context } = mountEditor();

        const originalEditor = context.editor.value!;

        originalEditor.commands.setContent("<p>Preserved content</p>");

        context.reset();

        const newEditor = context.editor.value!;

        expect(newEditor).not.toBe(originalEditor);
        expect(originalEditor.isDestroyed).toBe(true);
        expect(newEditor.isDestroyed).toBe(false);
        expect(newEditor.getHTML()).toBe("<p>Preserved content</p>");

        wrapper.unmount();
    });

    it("should destroy the editor when the component unmounts", () => {
        const { wrapper, context } = mountEditor();

        const editor = context.editor.value!;

        wrapper.unmount();

        expect(editor.isDestroyed).toBe(true);
        expect(context.editor.value).toBeNull();
    });

    it("should invoke the provided onUpdate callback", () => {
        const onUpdate = vi.fn();

        const { wrapper, context } = mountEditor({
            editorOptions: {
                onUpdate,
            },
        });

        context.editor.value!.commands.insertContent("Hello");

        expect(onUpdate).toHaveBeenCalledTimes(1);

        wrapper.unmount();
    });
});


describe("useRichTextModel", () => {
    it("should initialize the editor from the external model", async () => {
        const model = ref<string | null>("<p>Initial content</p>");

        const { wrapper, context } = mountEditor({
            model: {
                value: model,
            },
        });

        await nextTick();

        expect(context.editor.value!.getHTML()).toBe(
            "<p>Initial content</p>",
        );

        wrapper.unmount();
    });

    it("should update the editor when the external model changes", async () => {
        const model = ref<string | null>("<p>Initial content</p>");

        const { wrapper, context } = mountEditor({
            model: {
                value: model,
            },
        });

        model.value = "<p>Updated content</p>";

        await nextTick();

        expect(context.editor.value!.getHTML()).toBe(
            "<p>Updated content</p>",
        );

        wrapper.unmount();
    });

    it("should update the external model when the editor changes", async () => {
        const model = ref<string | null>("");

        const { wrapper, context } = mountEditor({
            model: {
                value: model,
            },
        });

        context.editor.value!.commands.insertContent("Hello");

        await nextTick();

        expect(model.value).toBe("<p>Hello</p>");

        wrapper.unmount();
    });

    it("should not update the model when watch is disabled", async () => {
        const model = ref<string | null>("<p>Initial content</p>");

        const { wrapper, context } = mountEditor({
            model: {
                value: model,
                watch: false,
            },
        });

        model.value = "<p>External update</p>";

        await nextTick();

        expect(context.editor.value!.getHTML()).toBe("<p></p>");

        wrapper.unmount();
    });
});
