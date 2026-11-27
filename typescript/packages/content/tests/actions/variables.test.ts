import { afterEach, describe, expect, it } from "vitest";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { variableAction, ifVariableAction, } from "../../src/actions/variables";
import { VariableNode, IfVariableNode, } from "../../src/blocks";
import { selectNode } from "../../src/utils"

import { createTestRichTextContext, } from "../fixtures/editor";
import { createTestVariableAction, } from "../fixtures/variables";


describe("variableAction", () => {
    const definition = createTestVariableAction("variable");

    let editor: Editor;

    function createEditor() {
        editor = new Editor({
            extensions: [
                StarterKit,
                VariableNode.configure({
                    block: definition,
                }),
                IfVariableNode.configure({
                    block: createTestVariableAction("ifvariable"),
                }),
            ],
        });

        return createTestRichTextContext(editor);
    }

    afterEach(() => {
        editor?.destroy();
    });

    it("should be enabled when the editor is editable", () => {
        const context = createEditor();

        expect(variableAction.isEnabled(context)).toBe(true);
    });

    it("should not be enabled when the editor is not editable", () => {
        const context = createEditor();

        editor.setEditable(false);

        expect(variableAction.isEnabled(context)).toBe(false);
    });

    it("should insert a variable node", () => {
        const context = createEditor();

        variableAction.run(context, {
            group: "user",
            variable: definition.variables[0].items[0],
        });

        expect(editor.getJSON().content).toEqual([
            {
                type: "paragraph",
                content: [
                    {
                        type: "variable",
                        attrs: expect.objectContaining({
                            name: "user.firstName",
                            title: "First name",
                        }),
                    },
                ],
            },
        ]);
    });

    it("should be active when a variable node is selected", () => {
        const context = createEditor();

        variableAction.run(context, {
            group: "user",
            variable: definition.variables[0].items[0],
        });

        selectNode(editor, "variable");

        expect(variableAction.isActive(context)).toBe(true);
    });
});

describe("ifVariableAction", () => {
    const definition = createTestVariableAction("ifvariable");

    let editor: Editor;

    function createEditor() {
        editor = new Editor({
            extensions: [
                StarterKit,
                VariableNode.configure({
                    block: createTestVariableAction("variable"),
                }),
                IfVariableNode.configure({
                    block: definition,
                }),
            ],
        });

        return createTestRichTextContext(editor);
    }

    afterEach(() => {
        editor?.destroy();
    });

    it("should be enabled when the editor is editable", () => {
        const context = createEditor();

        expect(ifVariableAction.isEnabled(context)).toBe(true);
    });

    it("should not be enabled when the editor is not editable", () => {
        const context = createEditor();

        editor.setEditable(false);

        expect(ifVariableAction.isEnabled(context)).toBe(false);
    });

    it("should insert an if-variable node with empty content", () => {
        const context = createEditor();

        ifVariableAction.run(context, {
            group: "user",
            variable: definition.variables[0].items[0],
        });

        const content = editor.getJSON().content!;

        expect(content[0]).toMatchObject({
            type: "ifvariable",
            attrs: {
                name: "user.firstName",
                title: "First name",
            },
        });

        expect(content[0].content).toBeUndefined();
        expect(content[1]).toEqual({
            type: "paragraph",
        });
    });

    it("should be active when an if-variable node is selected", () => {
        const context = createEditor();

        ifVariableAction.run(context, {
            group: "user",
            variable: definition.variables[0].items[0],
        });

        selectNode(editor, "ifvariable");

        expect(ifVariableAction.isActive(context)).toBe(true);
    });
});
