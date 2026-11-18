import type { Editor } from "@tiptap/core";
import type { RichTextContext } from './editor'

/**
 * Defines a command handler receiving the rich-text editor context.
 *
 * @template TArgs - Command argument types.
 * @template TResult - Command return type.
 */
export type RichTextCommandHandler<TArgs extends unknown[] = unknown[], TResult = unknown> = (
    context: RichTextContext,
    ...args: TArgs
) => TResult;

/**
 * Defines a collection of named rich-text command handlers.
 */
export type RichTextCommandDefinitions = Record<string, RichTextCommandHandler<any[], unknown>>;

/**
 * Exposes the registered commands available to editor consumers.
 */
export interface RichTextCommands {
    /**
     * Executes a TipTap chain command after focusing the editor.
     *
     * @param action - Name of the TipTap chain command.
     * @param args - Arguments forwarded to the TipTap command.
     * @returns The resulting command chain, or null if the editor is unavailable.
     */
    chain(action: string, ...args: unknown[]): ReturnType<Editor["chain"]> | null;

    /**
     * Executes a TipTap chain command and runs the resulting chain.
     *
     * @param action - Name of the TipTap chain command.
     * @param args - Arguments forwarded to the TipTap command.
     * @returns Whether the command chain was successfully executed.
     */
    edit(action: string, ...args: unknown[]): boolean;

    /**
     * Provides access to dynamically registered commands.
     */
    [name: string]: (...args: any[]) => unknown;
}
