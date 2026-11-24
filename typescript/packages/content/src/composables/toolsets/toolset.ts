import { unref } from "vue";
import type { Editor } from "@tiptap/core";

import type { ActionDefinition, AnyActionDefinition } from "ox-watt/ui";
import type { RichTextContext } from "../../types";


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
 *
 * @param inputs - Declarative action definitions.
 * @returns Normalized action definitions is an object (by name)
 */
export function createActions<
    TContext extends RichTextContext,
    TAction extends AnyActionDefinition<TContext> = AnyActionDefinition<TContext>
>(
    inputs: (EditorActionInput<TContext> & Omit<TAction, "run" | "isActive" | "isEnabled">)[]
): TAction[] {
    return inputs.map((input) => {
        const {
            command,
            run,
            isActive,
            isEnabled,
            ...attrs
        } = input;

        return {
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
                    : (context: TContext) => unref(context.editor).isActive(input.name)
        } as unknown as TAction;
    });
}
