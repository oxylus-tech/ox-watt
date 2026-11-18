import { effectScope } from "vue";
import { describe, expect, it, vi } from "vitest";

import { useCommands } from "@ox-watt/content/composables/commands";

import type { RichTextContext } from "@ox-watt/content/types/editor";

function createContext(): RichTextContext {
    const chain = {
        focus: vi.fn().mockReturnThis(),
        toggleBold: vi.fn().mockReturnThis(),
        run: vi.fn().mockReturnValue(true),
    };

    return {
        editor: {
            value: {
                chain: vi.fn().mockReturnValue(chain),
            },
        },
        commands: {} as RichTextContext["commands"],
    } as unknown as RichTextContext;
}

describe("useCommands", () => {
    it("should register and execute a command", () => {
        const context = createContext();
        const { commands, register } = useCommands(() => context);
        const handler = vi.fn().mockReturnValue("result");

        register({
            test: handler,
        }, false);

        expect(commands.test()).toBe("result");
        expect(handler).toHaveBeenCalledWith(context);
    });

    it("should provide command arguments after the context", () => {
        const context = createContext();
        const { commands, register } = useCommands(() => context);
        const handler = vi.fn();

        register({
            test: handler,
        }, false);

        commands.test("hello", 42);

        expect(handler).toHaveBeenCalledWith(context, "hello", 42);
    });

    it("should unregister commands manually", () => {
        const context = createContext();
        const { commands, register } = useCommands(() => context);

        const unregister = register({
            test: () => "result",
        }, false);

        expect(commands.test()).toBe("result");

        unregister();

        expect(commands.test).toBeUndefined();
    });

    it("should unregister commands only once", () => {
        const context = createContext();
        const { commands, register } = useCommands(() => context);

        const unregister = register({
            test: () => "result",
        }, false);

        unregister();
        unregister();

        expect(commands.test).toBeUndefined();
    });

    it("should automatically unregister commands when the scope is disposed", () => {
        const context = createContext();
        const scope = effectScope();

        let commands!: ReturnType<typeof useCommands>["commands"];

        scope.run(() => {
            const manager = useCommands(() => context);
            commands = manager.commands;

            manager.register({
                test: () => "result",
            });
        });

        expect(commands.test()).toBe("result");

        scope.stop();

        expect(commands.test).toBeUndefined();
    });

    it("should not automatically unregister commands when autoDispose is false", () => {
        const context = createContext();
        const scope = effectScope();

        let commands!: ReturnType<typeof useCommands>["commands"];

        scope.run(() => {
            const manager = useCommands(() => context);
            commands = manager.commands;

            manager.register({
                test: () => "result",
            }, false);
        });

        scope.stop();

        expect(commands.test()).toBe("result");
    });

    it("should reject duplicate command names", () => {
        const context = createContext();
        const { register } = useCommands(() => context);

        register({
            test: () => "first",
        }, false);

        expect(() => {
            register({
                test: () => "second",
            }, false);
        }).toThrow('A command named "test" is already registered.');
    });

    it("should not remove commands belonging to another registration", () => {
        const context = createContext();
        const { commands, register } = useCommands(() => context);

        const unregisterFirst = register({
            first: () => "first",
        }, false);

        register({
            second: () => "second",
        }, false);

        unregisterFirst();

        expect(commands.first).toBeUndefined();
        expect(commands.second()).toBe("second");
    });

    it("should expose the built-in chain command", () => {
        const context = createContext();
        const { commands } = useCommands(() => context);

        const chain = commands.chain("toggleBold");

        expect(chain).not.toBeNull();
        expect(context.editor.value.chain).toHaveBeenCalled();
    });

    it("should focus the editor before executing a chain command", () => {
        const context = createContext();
        const { commands } = useCommands(() => context);

        commands.chain("toggleBold");

        const chain = context.editor.value.chain();

        expect(chain.focus).toHaveBeenCalled();
        expect(chain.toggleBold).toHaveBeenCalled();
    });

    it("should execute and run a chain with edit", () => {
        const context = createContext();
        context.commands = useCommands(() => context).commands;

        const { commands } = useCommands(() => context);
        context.commands = commands;

        expect(commands.edit("toggleBold")).toBe(true);
    });

    it("should return false when edit is called without an editor", () => {
        const context = createContext();
        context.editor.value = null;

        const { commands } = useCommands(() => context);
        context.commands = commands;

        expect(commands.edit("toggleBold")).toBe(false);
    });

    it("should throw when a chain command does not exist", () => {
        const context = createContext();
        const { commands } = useCommands(() => context);

        expect(() => commands.chain("unknownCommand")).toThrow(
            'Unknown TipTap chain command "unknownCommand".',
        );
    });
});
