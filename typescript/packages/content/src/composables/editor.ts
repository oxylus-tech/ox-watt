import { Editor, type AnyExtension, type EditorOptions, type JSONContent, } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { markRaw, onBeforeUnmount, onMounted, provide, inject, shallowReactive, shallowRef, watch } from "vue";
import type { InjectionKey, ShallowRef } from "vue";

import type {
    EditorToolset,
    RichTextContext,
    RichTextEditorOptions,
    RichTextModelOptions,
} from "../types/editor";
import { useRegistration } from "ox-watt";
import { useCommands } from "./commands";


/**
 * Injection key used to share the rich text editor context.
 */
export const richTextContextKey: InjectionKey<RichTextContext> =
    Symbol("RichTextContext");


/**
 * Create and manage a TipTap rich text editor.
 *
 * The editor instance is created only after the owning component is mounted.
 * Toolsets can be registered dynamically by the owner or descendant components.
 *
 * @param options Editor configuration.
 * @returns The editor context.
 */
export function useRichTextEditor(
    options: RichTextEditorOptions = {},
): RichTextContext {
    const editor = shallowRef<Editor | null>(null);
    const model = options.model
        ? useRichTextModel(editor, options.model)
        : null;

    let context: RichTextContext;
    const commandManager = useCommands(() => context);
    const registrations = new Set<() => void>();

    const toolsets = shallowReactive(
        new Map<string, EditorToolset>(),
    );

    /**
     * Collect all registered extensions.
     *
     * Extensions are deduplicated by object identity.
     *
     * @returns The complete extension collection.
     */
    function getExtensions(): AnyExtension[] {
        const extensions: AnyExtension[] = [
            ...(options.starterKit !== false ? [StarterKit] : []),
            ...(options.extensions ?? [])
        ];

        for (const toolset of toolsets.values())
            extensions.push(...toolset.extensions);
        return extensions
    }

    /**
     * Create a new TipTap editor instance.
     *
     * @param content Optional content to restore.
     */
    function createEditor(content?: JSONContent): void {
        const editorOptions: Partial<EditorOptions> = {
            ...options.editorOptions,
            extensions: getExtensions(),
            onUpdate: (event) => {
                model?.updateModel(event.editor),
                options.editorOptions?.onUpdate?.(event)
            },
        };

        if (content !== undefined) {
            editorOptions.content = content;
        }

        editor.value = markRaw(
            new Editor(editorOptions as EditorOptions),
        );
    }

    /**
     * Rebuild the editor while preserving its current content.
     *
     * Does nothing if the editor has not yet been mounted.
     */
    function reset(): void {
        if (!editor.value) {
            return;
        }

        const content = editor.value.getJSON();

        editor.value.destroy();
        editor.value = null;

        createEditor(content);
    }

    /**
     * Registers an editor toolset.
     *
     * The toolset and its commands are automatically unregistered when the
     * current Vue scope is disposed, unless explicitly disabled.
     *
     * @param toolset - Toolset to register.
     * @param autoDispose - Whether to unregister the toolset when the current Vue scope is disposed.
     * @returns A function that unregisters the toolset.
     * @throws Error if a toolset with the same name is already registered.
     */
    function register(toolset: EditorToolset, autoDispose = true): () => void {
        if (toolsets.has(toolset.name)) {
            throw new Error(`A toolset named "${toolset.name}" is already registered.`);
        }

        let unregister!: () => void;

        unregister = useRegistration(() => {
            const unregisterCommands = toolset.commands
                ? commandManager.register(toolset.commands, false)
                : () => {};

            toolsets.set(toolset.name, toolset);

            return () => {
                unregisterCommands();
                toolsets.delete(toolset.name);
                registrations.delete(unregister);
            };
        }, autoDispose);

        registrations.add(unregister);

        return unregister;
    }

    // Register initial toolsets.
    for (const toolset of options.toolsets ?? []) {
        if (toolsets.has(toolset.name))
            throw new Error(
                `Duplicate toolset name "${toolset.name}".`,
            );

        register(toolset, false)
    }

    // Create the editor only after the component has been mounted.
    onMounted(() => {
        createEditor();
    });

    // Watch changes to the toolset collection.
    if (options.watchToolsets) {
        watch(
            () => Array.from(toolsets.values()),
            () => reset(),
        );
    }

    // Destroy the editor when its owner is unmounted.
    onBeforeUnmount(() => {
        for (const unregister of [...registrations])
            unregister();

        editor.value?.destroy();
        editor.value = null;
        toolsets.clear();
    });

    context = {
        editor,
        toolsets,
        register,
        reset,
        commands: commandManager.commands
    };

    provide(richTextContextKey, context);

    return context;
}


/**
 * Retrieve the rich text editor context from a parent component.
 *
 * @throws Error when no rich text editor context is available.
 * @returns The parent rich text editor context.
 */
export function useRichTextContext(): RichTextContext {
    const context = inject(richTextContextKey);

    if (!context) {
        throw new Error(
            "useRichTextContext must be called inside a component with a rich text editor provider.",
        );
    }

    return context;
}


/**
 * Synchronize a reactive model with a TipTap editor.
 *
 * @param editor Reactive TipTap editor instance.
 * @param options Model synchronization options.
 * @returns Model synchronization callbacks.
 */
export function useRichTextModel(
    editor: ShallowRef<Editor | null>,
    options: RichTextModelOptions,
) {
    /**
     * Update the external model from the editor content.
     *
     * @param instance TipTap editor instance.
     */
    function updateModel(instance: Editor): void {
        const content = instance.getHTML();

        if (options.value.value !== content) {
            options.value.value = content;
        }
    }

    // Synchronize external changes with the editor.
    if (options.watch !== false) {
        watch(
            [editor, () => options.value.value],
            ([instance, content]) => {
                if (!instance) {
                    return;
                }

                const value = content ?? "";

                if (instance.getHTML() !== value) {
                    instance.commands.setContent(value, {
                        emitUpdate: false,
                    });
                }
            },
            { immediate: true },
        );
    }

    return {
        updateModel,
    };
}
