import { t } from "vue"
import { Editor } from "@tiptap/vue"

import type { AnyAction } from "ox-watt";
import { createAction } from "ox-watt";
import type {
    VariableAction,
    VariableActionParam,
    IfVariableAction,
    RichTextContext
} from "./types"



function moveSelectionAfterParent(editor: Editor): ChainedCommands | undefined {
    return editor.chain().focus()
        .command(({ tr, dispatch }) => {
            const pos = editor.state.selection.$anchor.after(); // enter the block
            tr.setSelection( Selection.near(tr.doc.resolve(pos)) );
            if (dispatch) dispatch(tr);
            return true;
        })
}


export function createVariableAction<
    TContext extends RichTextContext = RichTextContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>(
    action: (Omit<TAction, "run" | "isActive" | "isEnabled">),
    options: CreateActionOptions
>: TAction
(
    return createAction({
        ...action,

        isEnabled: (context: RichTextContext) => {
            const editor = context.editor.value;

            if (!editor || !editor.isEditable) {
                return false;
            }

            return editor.can().chain()
                .focus()
                .command(({ tr }) => {
                    const pos = tr.selection.$anchor.after();

                    tr.setSelection(Selection.near(tr.doc.resolve(pos)));

                    return true;
                })
                .insertContent({
                    type: action.name,
                })
                .run();
        },

        isActive: (context: RichTextContext) => {
            return context.editor.value?.isActive(action.name) ?? false;
        },

        run: (context: RichTextContext, params: VariableActionParam) => {
            const editor = context.editor.value;

            if (!editor) {
                return;
            }

            moveSelectionAfterParent(editor).insertContent({
                type: action.name,
                attrs: {
                    ...params.variable,
                    name: `${params.group}.${params.variable.name}`,
                },
                ...(action.name === "ifvariable" ? { content: [] } : {}),
            }).run();
        },
    }, options);
)


export const variableAction = createVariableAction(
    {
        name: "variable",
        icon: "mdi-application-variable-outline"
    },
    {i18nPrefix: "ow-content.actions"}
)

export const ifVariableAction = createVariableAction(
    {
        name: "ifvariable",
        icon: "mdi-application-variable"
    },
    {i18nPrefix: "ow-content.actions"}
)
