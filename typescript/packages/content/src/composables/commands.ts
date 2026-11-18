import { shallowReactive } from "vue";

import { useRegistration } from "ox-watt";

import type {
    RichTextCommandDefinitions,
    RichTextCommands,
} from "../types/commands";

import type { RichTextContext } from "../types/editor";


/**
 * Creates a reactive registry of rich-text editor commands.
 *
 * Commands receive the editor context as their first argument internally.
 * The context is automatically provided when consumers execute a command.
 *
 * @param getContext - Returns the current rich-text editor context.
 * @returns The command registry and its registration method.
 */
export function useCommands(getContext: () => RichTextContext) {
    const commands = shallowReactive({}) as RichTextCommands;
    const registrations = new Map<string, symbol>();

    /**
     * Registers a collection of commands.
     *
     * Each registered command is exposed without its context parameter.
     * A command registration can be automatically disposed with the current Vue scope.
     *
     * @param definitions - Command definitions to register.
     * @param autoDispose - Whether to unregister commands when the current Vue scope is disposed.
     * @returns A function that unregisters the commands.
     * @throws Error if a command name is already registered.
     */
    function register(definitions: RichTextCommandDefinitions, autoDispose = true): () => void {
        return useRegistration(() => {
            const entries = Object.entries(definitions);
            const owner = Symbol("commands");

            // Validate all names before modifying the registry.
            for (const [name] of entries) {
                if (registrations.has(name)) {
                    throw new Error(`A command named "${name}" is already registered.`);
                }
            }

            // Register commands.
            for (const [name, handler] of entries) {
                registrations.set(name, owner);

                commands[name] = (...args: unknown[]) => handler(getContext(), ...args);
            }

            /**
             * Removes commands belonging to this registration.
             */
            function cleanup(): void {
                for (const [name] of entries) {
                    if (registrations.get(name) !== owner) {
                        continue;
                    }

                    registrations.delete(name);
                    delete commands[name];
                }
            }

            return cleanup;
        }, autoDispose);
    }

    // Register built-in commands without associating them with a Vue scope.
    register({
        /**
         * Creates a focused TipTap command chain.
         *
         * @param context - Rich-text editor context.
         * @param action - Name of the TipTap chain command.
         * @param args - Arguments passed to the TipTap command.
         * @returns The resulting command chain, or null if the editor is unavailable.
         */
        chain: (context, action: string, ...args: unknown[]) => {
            const chain = context.editor.value?.chain().focus();

            if (!chain) {
                return null;
            }

            const method = (chain as unknown as Record<string, unknown>)[action];

            if (typeof method !== "function") {
                throw new Error(`Unknown TipTap chain command "${action}".`);
            }

            method.apply(chain, args);

            return chain;
        },

        /**
         * Executes a focused TipTap command chain.
         *
         * @param context - Rich-text editor context.
         * @param action - Name of the TipTap chain command.
         * @param args - Arguments passed to the TipTap command.
         * @returns Whether the command chain was successfully executed.
         */
        edit: (context, action: string, ...args: unknown[]) => {
            const chain = context.commands.chain(action, ...args);

            return chain?.run() ?? false;
        },
    }, false);

    return {
        commands,
        register,
    };
}
