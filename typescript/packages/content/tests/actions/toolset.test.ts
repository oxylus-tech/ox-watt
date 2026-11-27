import { afterEach, describe, expect, it, vi } from "vitest";

import {
    createEditorAction,
    createEditorActions,
} from "../../src/actions/toolset";

import {
    createTestEditor,
    createTestRichTextContext,
} from "../fixtures/editor";


describe("createEditorAction", () => {
    const editor = createTestEditor();
    const context = createTestRichTextContext(editor);

    afterEach(() => {
        editor.commands.clearContent();
    });

    it("should create an action with its original attributes", () => {
        const action = createEditorAction({
            name: "bold",
            title: "Bold",
            icon: "bold",
            command: "toggleBold",
        }, {});

        expect(action).toMatchObject({
            name: "bold",
            title: "Bold",
            icon: "bold",
        });
    });

    it("should execute a TipTap command", () => {
        const action = createEditorAction({
            name: "bold",
            command: "toggleBold",
        }, {});

        action.run(context);

        expect(editor.isActive("bold")).toBe(true);
    });

    it("should execute a TipTap command with arguments", () => {
        const action = createEditorAction({
            name: "alignRight",
            command: ["setTextAlign", "right"],
        }, {});

        action.run(context);

        expect(editor.getAttributes("paragraph").textAlign).toBe("right");
    });

    it("should use the command availability to determine whether the action is enabled", () => {
        const action = createEditorAction({
            name: "bold",
            command: "toggleBold",
        }, {});

        expect(action.isEnabled(context)).toBe(true);
    });

    it("should use the action name to determine its active state by default", () => {
        const action = createEditorAction({
            name: "bold",
            command: "toggleBold",
        }, {});

        expect(action.isActive(context)).toBe(false);

        editor.commands.toggleBold();

        expect(action.isActive(context)).toBe(true);
    });

    it("should use a custom active-state name", () => {
        const action = createEditorAction({
            name: "alignRight",
            command: ["setTextAlign", "right"],
            isActive: "paragraph",
        }, {});

        expect(action.isActive(context)).toBe(true);
    });

    it("should use a custom active-state callback", () => {
        const isActive = vi.fn(() => true);

        const action = createEditorAction({
            name: "custom",
            command: "toggleBold",
            isActive,
        }, {});

        expect(action.isActive(context)).toBe(true);
        expect(isActive).toHaveBeenCalledWith(context);
    });

    it("should use a custom enabled-state callback", () => {
        const isEnabled = vi.fn(() => false);

        const action = createEditorAction({
            name: "custom",
            command: "toggleBold",
            isEnabled,
        }, {});

        expect(action.isEnabled(context)).toBe(false);
        expect(isEnabled).toHaveBeenCalledWith(context);
    });

    it("should use a custom run implementation", () => {
        const run = vi.fn();

        const action = createEditorAction({
            name: "custom",
            command: "toggleBold",
            run,
        }, {});

        action.run(context);

        expect(run).toHaveBeenCalledWith(context);
        expect(editor.isActive("bold")).toBe(false);
    });

    it("should throw when the command does not exist", () => {
        const action = createEditorAction({
            name: "invalid",
            command: "unknownCommand",
        }, {});

        expect(() => action.run(context)).toThrow(
            'Unknown editor command "unknownCommand".'
        );
    });
});

describe("createEditorActions", () => {
    it("should create an action for each input", () => {
        const actions = createEditorActions([
            {
                name: "bold",
                command: "toggleBold",
            },
            {
                name: "italic",
                command: "toggleItalic",
            },
        ], {});

        expect(actions).toHaveLength(2);
        expect(actions.map(action => action.name)).toEqual([
            "bold",
            "italic",
        ]);
    });

    it("should normalize each action independently", () => {
        const actions = createEditorActions([
            {
                name: "bold",
                command: "toggleBold",
            },
            {
                name: "alignRight",
                command: ["setTextAlign", "right"],
            },
        ], {});

        const editor = createTestEditor();
        const context = createTestRichTextContext(editor);

        actions[0].run(context);

        expect(editor.isActive("bold")).toBe(true);

        editor.commands.setTextAlign("left");
        actions[1].run(context);

        expect(editor.getAttributes("paragraph").textAlign).toBe("right");

        editor.destroy();
    });
});
