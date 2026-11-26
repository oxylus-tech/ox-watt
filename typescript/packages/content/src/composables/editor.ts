import type { AnyExtension, EditorOptions, JSONContent, ChainedCommands } from "@tiptap/core";
import { Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

import { markRaw, onBeforeUnmount, onMounted, provide, inject, shallowReactive, shallowRef, watch } from "vue";
import type { InjectionKey, ShallowRef } from "vue";

import { type ToolsetInstance, isAction } from "ox-watt/ui";
import type {
    EditorToolset,
    RichTextContext,
    RichTextEditorOptions,
    RichTextModelOptions,
} from "../types/editor";
import { useRegistration, useRootToolset } from "ox-watt";


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
export function useRichTextEditor<
    TContext extends RichTextContext = RichTextContext,
    TToolset extends EditorToolset<TContext> = EditorToolset<TContext>
>(
    options: RichTextEditorOptions<TContext, TToolset> = {},
): RichTextContext {
    const editor = shallowRef<Editor | null>(null);
    const model = options.model
        ? useRichTextModel(editor, options.model)
        : null;

    let context: RichTextContext;

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

        for (const toolset of context.toolset.registry.values()) {
            if(!isAction(toolset as TToolset))
                extensions.push(...((toolset as TToolset).extensions ?? []));
        }
        // TODO: unique extensions
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
                model?.updateModel(event.editor as Editor),
                options.editorOptions?.onUpdate?.(event)
            },
        };

        if (content !== undefined) {
            editorOptions.content = content;
        }

        const editorClass = options.editorClass ?? Editor

        editor.value = markRaw(
            new editorClass(editorOptions as EditorOptions),
        );
    }


    context = {
        editor,

        reset(): void {
            if (!editor.value)
                return;

            const content = editor.value.getJSON();
            editor.value.destroy();
            editor.value = null;
            createEditor(content);
        },

        chain(action: string, ...args: unknown[]): ChainedCommands | undefined {
            const chain = context.editor.value?.chain().focus();

            if (!chain)
                return undefined;

            const method = (chain as unknown as Record<string, unknown>)[action];
            if (typeof method !== "function")
                throw new Error(`Unknown TipTap chain command "${action}".`);

            method.apply(chain, args);
            return chain;
        },

        runChain(action: string, ...args: unknown[]): boolean {
            const chain = context.chain(action, ...args);
            return chain?.run() ?? false;
        },

        run(action: string, params?: unknown): unknown {
            return context.toolset!.run(action, params)
        }
    }

    context.toolset = useRootToolset(
        {
            ...(options.toolset ?? {}),
            name: "editor"
        },
        context,
    )

    // Create the editor only after the component has been mounted.
    onMounted(() => { createEditor(); });

    // Watch changes to the toolset collection.
    if (options.watchToolsets) {
        watch(
            () => Array.from(context.toolset.instances.values()),
            () => context.reset(),
        );
    }

    // Destroy the editor when its owner is unmounted.
    onBeforeUnmount(() => {
        editor.value?.destroy();
        editor.value = null;
    });

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
