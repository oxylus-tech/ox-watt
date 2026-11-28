import { unref } from "vue";
import type { Editor } from "@tiptap/core";

import type {
    Toolset,
    ToolsetAction,
    ToolsetInstance,
    UseToolsetOptions,
    CreateActionOptions
} from "ox-watt";
import { useToolset, createAction } from "ox-watt";

import type {
    RichTextContext,
    EditorToolset,
    EditorAction,
    AnyEditorAction
} from "../types";


export function useEditorToolset<
    TToolset extends EditorToolset<any>=EditorToolset<any>,
    TAction extends ToolsetAction<TToolset> = ToolsetAction<TToolset>
>(
    definition: TToolset,
    context: RichTextContext,
    options: Omit<UseToolsetOptions<RichTextContext>, "register"> = {},
): ToolsetInstance<RichTextContext, TToolset> {
    return useToolset(definition, context, {
        ...options, register: true
    })
}


/**
 * Defines a TipTap command and its optional arguments.
 */
export type EditorCommand =
    | string
    | [name: string, ...args: unknown[]];

/**
 * Defines a declarative editor action.
 *
 */
export interface EditorActionInput
{
    /** TipTap command and its optional arguments. */
    command: EditorCommand;

    /** Custom action implementation. */
    run?: (context: RichTextContext) => unknown;

    /** Custom enabled-state implementation. */
    isEnabled?: (context: RichTextContext) => boolean;

    /** Active-state configuration or custom implementation. */
    isActive?:
        | string
        | Record<string, unknown>
        | ((context: RichTextContext) => boolean);
}


/**
 * Executes a TipTap command through an editor chain.
 *
 * @param editor - TipTap editor instance.
 * @param command - Command name and optional arguments.
 * @param can - Whether to check command availability without executing it.
 * @returns Whether the command was successful or available.
 */
export function executeCommand(
    editor: Editor,
    command: EditorCommand,
    can = false
): boolean {
    const [name, ...args] = typeof command === "string"
        ? [command]
        : command;

    const chain = can
        ? editor.can().chain()
        : editor.chain().focus();

    const execute = (chain as any)[name];

    if (typeof execute !== "function")
        throw new Error(`Unknown editor command "${name}".`);

    return execute.apply(chain, args).run();
}
/**
 * Normalizes declarative editor actions into toolset action definitions.
 *
 * @template TAction - Resulting action definition type.
 *
 * @param inputs - Declarative action definitions.
 * @param options - Action creation options.
 * @returns Normalized action definitions.
 */
export function createEditorActions<
    TAction extends AnyEditorAction = AnyEditorAction
>(
    inputs: (EditorActionInput & Omit<TAction, "run" | "isActive" | "isEnabled">)[],
    options: CreateActionOptions = {}
): TAction[] {
    return inputs.map((input) => createEditorAction<TAction>(input, options));
}

/**
 * Normalizes a declarative editor action into an action definition.
 *
 * @template TAction - Resulting action definition type.
 *
 * @param action - Declarative action definition.
 * @param options - Action creation options.
 * @returns Normalized action definition.
 */
export function createEditorAction<
    TAction extends AnyEditorAction = AnyEditorAction
>(
    action: EditorActionInput & Omit<TAction, "run" | "isActive" | "isEnabled">,
    options: CreateActionOptions = {}
): TAction {
    const {
        command,
        run,
        isActive,
        isEnabled,
        ...attrs
    } = action;

    return createAction<RichTextContext, TAction>(
        {
            ...attrs,

            run: run ?? ((context: RichTextContext) => executeCommand(
                unref(context.editor),
                command
            )),

            isEnabled: isEnabled ?? ((context: RichTextContext) => executeCommand(
                unref(context.editor),
                command,
                true
            )),

            isActive: typeof isActive === "function"
                ? isActive
                : isActive !== undefined
                    ? (context: RichTextContext) => unref(context.editor).isActive(isActive)
                    : (context: RichTextContext) => unref(context.editor).isActive(action.name)
        } as unknown as TAction,
        options
    );
}
