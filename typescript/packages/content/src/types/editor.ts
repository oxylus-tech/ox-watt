import type { AnyExtension, EditorOptions, JSONContent } from "@tiptap/core";
import type { Editor } from "@tiptap/vue-3";
import type { Ref, ShallowRef, } from "vue";

import type { RichTextCommands, RichTextCommandDefinitions } from './commands.ts'


/**
 * Constructor type for a Vue-compatible TipTap editor.
 */
export type EditorConstructor<TEditor extends Editor = Editor> =
    new (options?: Partial<EditorOptions>) => TEditor;


/**
 * Shared configuration for rich text editors.
 */
export interface RichTextEditorConfig {
    /**
     * Automatically include TipTap StarterKit.
     *
     * @default true
     */
    starterKit?: boolean;

    /**
     * Additional TipTap extensions.
     */
    extensions?: AnyExtension[];

    /**
     * Toolsets registered when the editor is initialized.
     */
    toolsets?: EditorToolset[];

    /**
     * Additional TipTap editor configuration.
     */
    editorOptions?: Partial<EditorOptions>;

    /**
     * Automatically rebuild the editor when registered toolsets change.
     *
     * @default false
     */
    watchToolsets?: boolean;

    /**
     * The editor's class to use for instanciation.
     *
     * It MUST subclass `@tiptap/vue-3`'s editor.
     */
    editorClass?: Editor;
}

/**
 * Reactive model configuration for a rich text editor.
 */
export interface RichTextModelOptions {
    /**
     * Reactive model value synchronized with the editor.
     *
     * HTML content is expected when using string values.
     * JSON content is supported for future format-specific synchronization.
     */
    value: Ref<string | null>;

    /**
     * Automatically synchronize external model changes with the editor.
     *
     * Editor changes are still propagated to the model when disabled.
     *
     * @default true
     */
    watch?: boolean;
}

/**
 * Options for creating and managing a rich text editor.
 */
export interface RichTextEditorOptions extends RichTextEditorConfig {
    /**
     * Optional reactive model configuration.
     */
    model?: RichTextModelOptions;
}

/**
 * Properties accepted by the OwRichTextEditor component.
 */
export interface OwRichTextEditorProps extends RichTextEditorConfig {
    /**
     * Content synchronized with the editor through v-model.
     *
     * The current implementation uses HTML.
     */
    modelValue?: string | null;

    /**
     * Whether the editor is disabled.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the editor is read-only.
     *
     * @default false
     */
    readonly?: boolean;
}

/**
 * Shared context for a rich text editor and its descendants.
 */
export interface RichTextContext {
    /**
     * Reactive reference to the TipTap editor instance.
     *
     * The value is null until the editor has been initialized
     * and after it has been destroyed.
     */
    editor: ShallowRef<Editor | null>;

    /**
     * Registered editor toolsets, indexed by their unique names.
     */
    toolsets: Map<string, EditorToolset>;

    /**
     * Register a toolset in the editor context.
     *
     * @param toolset Toolset to register.
     * @param unmount Automatically unregister the toolset when
     * the current component is unmounted.
     * @returns A function that unregisters the toolset.
     */
    register(
        toolset: EditorToolset,
        unmount?: boolean,
    ): () => void;

    /**
     * Rebuild the editor while preserving its current content.
     *
     * Does nothing if the editor has not been initialized.
     */
    reset(): void;

    /**
     * Registered editor commands.
     */
    commands: RichTextCommands;
}

/**
 * Toolset registered in a rich text editor.
 */
export interface EditorToolset {
    /**
     * Unique toolset identifier.
     */
    name: string;

    /**
     * TipTap extensions required by this toolset.
     */
    extensions: AnyExtension[];

    /**
     * Commands contributed by this toolset.
     */
    commands?: RichTextCommandDefinitions;
}
