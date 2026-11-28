import { Editor } from "@tiptap/vue-3"
import {Selection} from "@tiptap/pm/state"

import type { AnyAction, ActionParam, CreateActionOptions } from "ox-watt";
import { createAction } from "ox-watt";

import type {
    VariableAction,
    VariableActionParam,
    IfVariableAction,
    RichTextContext
} from "../types"
import { IfVariableNode, VariableNode } from "../blocks"
import { moveSelectionAfterParent } from "../utils"


export function createVariableAction<
    TAction extends VariableAction<any, any> = VariableAction<any, any>
>(
    action: Omit<TAction, "run" | "isActive" | "isEnabled">,
    options: CreateActionOptions
): TAction
{
    const definition = {
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

        run: (context: RichTextContext, params: ActionParam<TAction>) => {
            if(!params)
                return;

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
    }

    return createAction<RichTextContext, TAction>(
        definition as unknown as TAction,
        options
    )
}


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


export const variablesToolset = {
    name: "variables",

    items: [
        variableAction,
        ifVariableAction
    ],

    extensions: [
        VariableNode,
        IfVariableNode
    ],
}
