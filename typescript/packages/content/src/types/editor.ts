import type { AnyExtension, EditorOptions, JSONContent, ChainedCommands } from "@tiptap/core";
import type { Editor } from "@tiptap/vue-3";
import type { Ref, ShallowRef, } from "vue";

import type { ToolsetDefinition, ToolsetInstance } from "ox-watt/ui"


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
     * Root toolset definition.
     */
    toolset?: ToolsetDefinition<RichTextContext>;

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
    editorClass?: EditorConstructor;
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
    toolset?: ToolsetInstance<RichTextContext>;

    /**
     * Rebuild the editor while preserving its current content.
     *
     * Does nothing if the editor has not been initialized.
     */
    reset(): void;

    /**
     * Creates a focused TipTap command chain.
     *
     * @param context - Rich-text editor context.
     * @param action - Name of the TipTap chain command.
     * @param args - Arguments passed to the TipTap command.
     * @returns The resulting command chain, or null if the editor is unavailable.
     */
    chain(action: string, ...args: unknown[]): ChainedCommands | undefined;

    /**
     * Executes a focused TipTap command chain.
     *
     * @param context - Rich-text editor context.
     * @param action - Name of the TipTap chain command.
     * @param args - Arguments passed to the TipTap command.
     * @returns Whether the command chain was successfully executed.
     */
    edit(action: string, ...args: unknown[]): boolean;

    /**
     * Run a command declared by nested toolsets.
     *
     * @param action - Path to a toolset's actions.
     * @param params - Parameters to pass down to the action.
     */
    run(action: string, params?: unknown): unknown;
}

/**
 * Toolset registered in a rich text editor.
 */
export interface EditorToolset extends ToolsetDefinition<RichTextContext> {
    /**
     * TipTap extensions required by this toolset.
     */
    extensions: AnyExtension[];
}
