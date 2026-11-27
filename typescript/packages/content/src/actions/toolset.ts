import { unref } from "vue";
import type { Editor } from "@tiptap/core";

import type {
    Action,
    AnyAction,
    Toolset,
    ToolsetAction,
    ToolsetInstance,
    UseToolsetOptions,
    CreateActionOptions
} from "ox-watt";
import { useToolset, createAction } from "ox-watt";

import type { RichTextContext, EditorToolset } from "../types";


export function useEditorToolset<
    TContext extends RichTextContext,
    TToolset extends EditorToolset<TContext, any>=EditorToolset<TContext, any>,
    TAction extends ToolsetAction<TToolset> = ToolsetAction<TToolset>
>(
    definition: TToolset,
    context: TContext,
    options: Omit<UseToolsetOptions<TContext>, "register"> = {},
): ToolsetInstance<TContext, TToolset> {
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
 * @template TContext - Action execution context.
 */
export interface EditorActionInput<TContext extends RichTextContext>
{
    /** TipTap command and its optional arguments. */
    command: EditorCommand;

    /** Custom action implementation. */
    run?: (context: TContext) => unknown;

    /** Custom enabled-state implementation. */
    isEnabled?: (context: TContext) => boolean;

    /** Active-state configuration or custom implementation. */
    isActive?:
        | string
        | Record<string, unknown>
        | ((context: TContext) => boolean);
}


/**
 * Executes a TipTap command through an editor chain.
 *
 * @param editor - TipTap editor instance.
 * @param command - Command name and optional arguments.
 * @param can - Whether to check command availability without executing it.
 * @returns Whether the command was successful or available.
 */
function executeCommand(
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
 * @template TContext - Action execution context.
 * @template TAction - Resulting action definition type.
 *
 * @param inputs - Declarative action definitions.
 * @param options - Action creation options.
 * @returns Normalized action definitions.
 */
export function createEditorActions<
    TContext extends RichTextContext = RichTextContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>(
    inputs: (EditorActionInput<TContext> & Omit<TAction, "run" | "isActive" | "isEnabled">)[],
    options: CreateActionOptions
): TAction[] {
    return inputs.map((input) => createEditorAction<TContext, TAction>(input, options));
}

/**
 * Normalizes a declarative editor action into an action definition.
 *
 * @template TContext - Action execution context.
 * @template TAction - Resulting action definition type.
 *
 * @param action - Declarative action definition.
 * @param options - Action creation options.
 * @returns Normalized action definition.
 */
export function createEditorAction<
    TContext extends RichTextContext = RichTextContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>(
    action: EditorActionInput<TContext> & Omit<TAction, "run" | "isActive" | "isEnabled">,
    options: CreateActionOptions
): TAction {
    const {
        command,
        run,
        isActive,
        isEnabled,
        ...attrs
    } = action;

    return createAction({
        ...attrs,

        run: run ?? ((context: TContext) => executeCommand(
            unref(context.editor),
            command
        )),

        isEnabled: isEnabled ?? ((context: TContext) => executeCommand(
            unref(context.editor),
            command,
            true
        )),

        isActive: typeof isActive === "function"
            ? isActive
            : isActive !== undefined
                ? (context: TContext) => unref(context.editor).isActive(isActive)
                : (context: TContext) => unref(context.editor).isActive(action.name)
    } as unknown as TAction);
}
