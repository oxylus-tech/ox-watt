import { shallowRef } from "vue";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import { NodeSelection } from "@tiptap/pm/state";

import type { RichTextContext } from "../../src/types";

export function createTestEditor(): Editor {
    return new Editor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],
    });
}

/**
 * Creates a minimal rich-text context around an editor instance.
 *
 * @param editor - TipTap editor instance.
 * @returns Rich-text context suitable for action tests.
 */
export function createTestRichTextContext(editor: Editor): RichTextContext {
    return {
        editor: shallowRef(editor),
        reset: () => undefined,
        chain: (action, ...args) => {
            const chain = editor.chain().focus();
            const command = (chain as any)[action];

            if (typeof command !== "function") {
                throw new Error(`Unknown TipTap command "${action}".`);
            }

            return command.apply(chain, args);
        },
        runChain: (action, ...args) => {
            const chain = editor.chain().focus();
            const command = (chain as any)[action];

            if (typeof command !== "function") {
                throw new Error(`Unknown TipTap command "${action}".`);
            }

            return command.apply(chain, args).run();
        },
        run: () => undefined,
    } as RichTextContext;
}

/**
 * Selects the first node matching the given type name.
 *
 * @param editor - TipTap editor instance.
 * @param name - Node type name to select.
 * @throws If no matching node is found.
 */
export function selectNode(editor: Editor, name: string): void {
    let position: number | undefined;

    editor.state.doc.descendants((node, pos) => {
        if (node.type.name === name) {
            position = pos;
            return false;
        }
    });

    if (position === undefined) {
        throw new Error(`Node "${name}" was not found.`);
    }

    editor.view.dispatch(
        editor.state.tr.setSelection(
            NodeSelection.create(editor.state.doc, position)
        )
    );
}
