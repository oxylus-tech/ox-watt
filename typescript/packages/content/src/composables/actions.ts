import type { EditorToolset, RichTextContext } from "../types";
import type { VariableGroup, IfVariableAction, VariableAction } from "../types/actions";

import { variableAction, ifVariableAction } from "../actions/variables";
import { VariableNode, IfVariableNode } from "../blocks";


/**
 * Options of the {@link useVariableToolset}.
 */
export interface UseVariableToolsetOptions {
    /** Overrides VariableAction **/
    variableAction?: VariableAction;

    /** Overrides IfVariableAction **/
    ifVariableAction?: IfVariableAction;
}

/**
 * Creates the toolset providing variable-related actions and extensions.
 *
 * The variable catalogue is static: changing it requires recreating the
 * toolset and the editor.
 *
 * @param variables - Available variable groups.
 * @returns The configured variable toolset.
 */
export function useVariableToolset(
    variables: VariableGroup[],
    options: UseVariableToolsetOptions = {}
): EditorToolset<any> {
    const variableBlock = options.variableAction ?? variableAction
    const ifVariableBlock = options.ifVariableAction ?? ifVariableAction

    return {
        name: "variables",
        items: [
            variableBlock,
            ifVariableBlock
        ],
        extensions: [
            VariableNode.configure({
                block: variableBlock,
                variables
            }),
            IfVariableNode.configure({
                block: ifVariableBlock,
                variables
            })
        ]
    };
}
