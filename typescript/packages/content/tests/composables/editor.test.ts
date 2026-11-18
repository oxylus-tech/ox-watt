import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";

import {
    useRichTextEditor,
    useRichTextContext
} from "@ox-watt/content/composables/editor";
import type { RichTextContext, EditorToolset } from "@ox-watt/content/types/editor";

import {
    AnotherTestExtension,
    TestEditorOptions,
    TestToolset,
} from "../fixtures";


describe("useRichTextEditor", () => {
    it("should include StarterKit by default", () => {
        const wrapper = mount({
            setup() {
                const context = useRichTextEditor();

                return { context };
            },
            template: "<div></div>",
        });

        expect(wrapper.vm.context.editor.value).not.toBeNull();

        wrapper.unmount();
    });

    it("should create the editor only after the component is mounted", () => {
        let context: RichTextContext | undefined;
        let editorAtSetup: RichTextContext["editor"]["value"] = null;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    editorOptions: TestEditorOptions,
                });

                editorAtSetup = context.editor.value;

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        expect(editorAtSetup).toBeNull();
        expect(context?.editor.value).not.toBeNull();

        wrapper.unmount();

        expect(context?.editor.value).toBeNull();
    });

    it("should register initial toolsets before creating the editor", () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    toolsets: [TestToolset],
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        expect(context?.toolsets.get("test")).toBe(TestToolset);
        expect(context?.editor.value).not.toBeNull();

        wrapper.unmount();
    });

    it("should reject duplicate initial toolset names", () => {
        const duplicate = {
            name: "test",
            extensions: [],
        };

        const component = defineComponent({
            setup() {
                useRichTextEditor({
                    toolsets: [TestToolset, duplicate],
                });

                return () => h("div");
            },
        });

        expect(() => mount(component)).toThrow(
            'Duplicate toolset name "test".',
        );
    });

    it("should register and unregister toolsets", () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    editorOptions: TestEditorOptions,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const unregister = context!.register(TestToolset, false);

        expect(context!.toolsets.get("test")).toBe(TestToolset);

        unregister();

        expect(context!.toolsets.has("test")).toBe(false);

        wrapper.unmount();
    });

    it("should reject toolsets with an already registered name", () => {
        const component = defineComponent({
            setup() {
                const context = useRichTextEditor({
                    ...TestEditorOptions,
                    toolsets: [TestToolset],
                });

                expect(() => context.register({
                    name: "test",
                    extensions: [],
                }, false)).toThrow(
                    'A toolset named "test" is already registered.',
                );

                return () => h("div");
            },
        });

        mount(component);
    });

    it("should not rebuild the editor when watch is disabled", () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    watch: false,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const initialEditor = context!.editor.value;

        context!.register(TestToolset, false);

        expect(context!.editor.value).toBe(initialEditor);

        wrapper.unmount();
    });

    it("should rebuild the editor when a toolset is registered", async () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    watchToolsets: true,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const initialEditor = context!.editor.value;

        context!.register(TestToolset, false);

        await nextTick();

        expect(context!.editor.value).not.toBe(initialEditor);
        expect(initialEditor!.isDestroyed).toBe(true);

        wrapper.unmount();
    });

    it("should rebuild the editor when a toolset is unregistered", async () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    watchToolsets: true,
                    toolsets: [TestToolset],
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const initialEditor = context!.editor.value;

        const unregister = context!.register({
            name: "another",
            extensions: [],
        }, false);

        await nextTick();

        const secondEditor = context!.editor.value;

        expect(secondEditor).not.toBe(initialEditor);

        unregister();

        await nextTick();

        expect(context!.editor.value).not.toBe(secondEditor);
        expect(secondEditor!.isDestroyed).toBe(true);

        wrapper.unmount();
    });

    it("should preserve the document when rebuilding the editor", async () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    watchToolsets: true,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const initialEditor = context!.editor.value!;

        initialEditor.commands.setContent("<p>Hello world</p>");

        const initialContent = initialEditor.getJSON();

        context!.register(TestToolset, false);

        await nextTick();

        expect(context!.editor.value!.getJSON()).toEqual(initialContent);

        wrapper.unmount();
    });

    it("should allow manual editor reset", () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const initialEditor = context!.editor.value;

        context!.reset();

        expect(context!.editor.value).not.toBe(initialEditor);
        expect(initialEditor!.isDestroyed).toBe(true);

        wrapper.unmount();
    });

    it("should automatically unregister a toolset when its component unmounts", async () => {
        let context: RichTextContext | undefined;

        const showChild = ref(true);

        const child = defineComponent({
            setup() {
                const childContext = useRichTextContext();

                childContext.register(TestToolset);

                return () => h("span");
            },
        });

        const parent = defineComponent({
            setup() {
                context = useRichTextEditor({
                    ...TestEditorOptions,
                    watchToolsets: true,
                });

                return () => h("div", [
                    showChild.value ? h(child) : null,
                ]);
            },
        });

        const wrapper = mount(parent);

        expect(context!.toolsets.has("test")).toBe(true);

        const initialEditor = context!.editor.value;

        showChild.value = false;

        await nextTick();
        await nextTick();

        expect(context!.toolsets.has("test")).toBe(false);
        expect(context!.editor.value).not.toBe(initialEditor);
        expect(initialEditor!.isDestroyed).toBe(true);

        wrapper.unmount();
    });

    it("should destroy the editor when the owner component unmounts", () => {
        let context: RichTextContext | undefined;

        const component = defineComponent({
            setup() {
                context = useRichTextEditor({
                    editorOptions: TestEditorOptions,
                });

                return () => h("div");
            },
        });

        const wrapper = mount(component);

        const editor = context!.editor.value!;

        wrapper.unmount();

        expect(editor.isDestroyed).toBe(true);
        expect(context!.editor.value).toBeNull();
    });
});



describe("useRichTextContext", () => {
    it("should return the parent editor context", () => {
        let parentContext: RichTextContext | undefined;
        let childContext: RichTextContext | undefined;

        const child = defineComponent({
            setup() {
                childContext = useRichTextContext();

                return () => h("span");
            },
        });

        const parent = defineComponent({
            setup() {
                parentContext = useRichTextEditor({
                    editorOptions: TestEditorOptions,
                });

                return () => h("div", [
                    h(child),
                ]);
            },
        });

        const wrapper = mount(parent);

        expect(childContext).toBe(parentContext);

        wrapper.unmount();
    });

    it("should throw when no editor context is provided", () => {
        const component = defineComponent({
            setup() {
                useRichTextContext();

                return () => h("div");
            },
        });

        expect(() => mount(component)).toThrow(
            "useRichTextContext must be called inside a component with a rich text editor provider.",
        );
    });
});


describe("useRichTextEditor commands", () => {
    it("should expose the command registry", () => {
        let context!: RichTextContext;

        mount({
            setup() {
                context = useRichTextEditor();

                return () => null;
            },
        });

        expect(context.commands).toBeDefined();
        expect(context.commands.chain).toBeTypeOf("function");
        expect(context.commands.edit).toBeTypeOf("function");
    });

    it("should initialize built-in commands before mounting the editor", () => {
        let context!: RichTextContext;

        mount({
            setup() {
                context = useRichTextEditor();

                expect(context.commands.chain).toBeTypeOf("function");
                expect(context.commands.edit).toBeTypeOf("function");

                return () => null;
            },
        });

        expect(context.editor.value).not.toBeNull();
    });

    it("should register commands provided by a toolset", () => {
        let context!: RichTextContext;

        const toolset: EditorToolset = {
            name: "test",
            extensions: [],
            commands: {
                testCommand: (ctx) => ctx.editor.value !== null,
            },
        };

        mount({
            setup() {
                context = useRichTextEditor();
                context.register(toolset);

                return () => null;
            },
        });

        expect(context.commands.testCommand()).toBe(true);
    });

    it("should pass the editor context to toolset commands", () => {
        let context!: RichTextContext;
        const handler = vi.fn((ctx: RichTextContext) => ctx);

        const toolset: EditorToolset = {
            name: "test",
            extensions: [],
            commands: {
                testCommand: handler,
            },
        };

        mount({
            setup() {
                context = useRichTextEditor();
                context.register(toolset);

                return () => null;
            },
        });

        expect(context.commands.testCommand()).toBe(context);
        expect(handler).toHaveBeenCalledWith(context);
    });

    it("should unregister toolset commands manually", () => {
        let context!: RichTextContext;
        let unregister!: () => void;

        const toolset: EditorToolset = {
            name: "test",
            extensions: [],
            commands: {
                testCommand: () => true,
            },
        };

        mount({
            setup() {
                context = useRichTextEditor();
                unregister = context.register(toolset);

                return () => null;
            },
        });

        expect(context.commands.testCommand()).toBe(true);

        unregister();

        expect(context.commands.testCommand).toBeUndefined();
    });

    it("should unregister toolset commands when the owner component is unmounted", () => {
        let context!: RichTextContext;

        const toolset: EditorToolset = {
            name: "test",
            extensions: [],
            commands: {
                testCommand: () => true,
            },
        };

        const wrapper = mount({
            setup() {
                context = useRichTextEditor();
                context.register(toolset);

                return () => null;
            },
        });

        expect(context.commands.testCommand()).toBe(true);

        wrapper.unmount();

        expect(context.commands.testCommand).toBeUndefined();
    });

    it("should keep built-in commands when a toolset is unregistered", () => {
        let context!: RichTextContext;
        let unregister!: () => void;

        const toolset: EditorToolset = {
            name: "test",
            extensions: [],
            commands: {
                testCommand: () => true,
            },
        };

        mount({
            setup() {
                context = useRichTextEditor();
                unregister = context.register(toolset);

                return () => null;
            },
        });

        unregister();

        expect(context.commands.testCommand).toBeUndefined();
        expect(context.commands.chain).toBeTypeOf("function");
        expect(context.commands.edit).toBeTypeOf("function");
    });

    it("should keep the command registry stable when the editor is reset", async () => {
        let context!: RichTextContext;

        mount({
            setup() {
                context = useRichTextEditor();

                return () => null;
            },
        });

        const commands = context.commands;
        const initialEditor = context.editor.value;

        context.reset();

        await nextTick();

        expect(context.commands).toBe(commands);
        expect(context.editor.value).not.toBe(initialEditor);
    });
});
