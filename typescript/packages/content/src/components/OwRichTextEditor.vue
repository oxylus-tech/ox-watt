<script setup lang="ts">
import { watch } from "vue";
import { EditorContent } from "@tiptap/vue-3";

import { useRichTextEditor } from "../composables/editor";

import type { OwRichTextEditorProps } from "../types/editor";

defineOptions({
    name: "OwRichTextEditor",
});

const props = withDefaults(defineProps<OwRichTextEditorProps>(), {
    disabled: false,
    readonly: false,
    starterKit: true,
});

/**
 * HTML content synchronized with the parent component.
 */
const model = defineModel<string | null>({
    default: null,
});

/**
 * Whether the editor should allow editing.
 *
 * The editable option provided through editorOptions is also respected.
 */
function isEditable(): boolean {
    return (
        (props.editorOptions?.editable ?? true)
        && !props.disabled
        && !props.readonly
    );
}

const context = useRichTextEditor({
    starterKit: props.starterKit,
    extensions: props.extensions,
    editorOptions: {
        ...props.editorOptions,
        editable: isEditable(),
    },
    watchToolsets: props.watchToolsets,
    model: {
        value: model,
    },
});

const editor = context.editor;

// Keep the editor editable state synchronized with component properties.
watch(
    [editor, () => props.disabled, () => props.readonly],
    ([instance]) => {
        instance?.setEditable(isEditable());
    },
);

/**
 * Expose the editor context to parent components.
 */
defineExpose({
    context,
    editor,
    toolset: context.toolset,
    run: context.run,
    reset: context.reset,
});
</script>

<template>
    <div
        class="ow-rich-text-editor"
        :class="{
            'is-disabled': disabled,
            'is-readonly': readonly,
        }"
        :aria-disabled="disabled || undefined"
    >
        <input v-if="props.name" :name="name" :value="model"/>
        <slot name="prepend" :editor="editor" :context="context"/>
        <slot :editor="editor" :context="context">
            <EditorContent :editor="editor" />
        </slot>
        <slot name="append" :editor="editor" :context="context"/>
    </div>
</template>
