import type { ChainedCommands } from "@tiptap/core";
import { Editor } from "@tiptap/vue-3"
import {Selection} from "@tiptap/pm/state"
import { NodeSelection } from "@tiptap/pm/state";

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


export function moveSelectionAfterParent(editor: Editor): ChainedCommands | undefined {
    return editor.chain().focus()
        .command(({ tr, dispatch }) => {
            const pos = editor.state.selection.$anchor.after(); // enter the block
            tr.setSelection( Selection.near(tr.doc.resolve(pos)) );
            if (dispatch) dispatch(tr);
            return true;
        })
}
