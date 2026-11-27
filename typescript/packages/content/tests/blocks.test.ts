import { describe, expect, it } from "vitest";

import StarterKit from "@tiptap/starter-kit";
import { getSchema } from "@tiptap/core";
import { DOMParser, DOMSerializer, } from "@tiptap/pm/model";

import { resolveVariable, VariableNode, IfVariableNode, } from "../src/blocks";

import { TestVariableGroups, TestVariableAction, } from "./fixtures";


const schema = getSchema([
    StarterKit,
    VariableNode.configure({
        block: TestVariableAction,
    }),
    IfVariableNode.configure({
        block: TestVariableAction,
    }),
]);


/**
 * Parse an HTML fragment into a ProseMirror document.
 *
 * @param html - HTML fragment to parse.
 * @returns Parsed ProseMirror document.
 */
function parseHTML(html: string) {
    const element = document.createElement("div");
    element.innerHTML = html;

    return DOMParser.fromSchema(schema).parse(element);
}

/**
 * Serialize a ProseMirror document into an HTML string.
 *
 * @param doc - Document to serialize.
 * @returns Serialized HTML.
 */
function renderHTML(doc: ReturnType<typeof parseHTML>): string {
    const element = document.createElement("div");
    const fragment = DOMSerializer.fromSchema(schema).serializeFragment(doc.content);

    element.appendChild(fragment);

    return element.innerHTML;
}


describe("resolveVariable", () => {
    it("should resolve a variable from its dotted path", () => {
        expect(resolveVariable(TestVariableGroups, "user.firstName")).toEqual({
            name: "firstName",
            title: "First name",
            description: "The user's first name",
            icon: "mdi-account"
        });
    });

    it("should resolve variables from different groups", () => {
        expect(resolveVariable(TestVariableGroups, "company.name")).toEqual({
            name: "name",
            title: "Company name",
        });
    });

    it("should return undefined when the group does not exist", () => {
        expect(resolveVariable(TestVariableGroups, "unknown.firstName")).toBeUndefined();
    });

    it("should return undefined when the variable does not exist", () => {
        expect(resolveVariable(TestVariableGroups, "user.unknown")).toBeUndefined();
    });

    it.each([
        "",
        "user",
        "user.",
        ".firstName",
        "user.firstName.extra",
    ])("should return undefined for an invalid path: %s", (name) => {
        expect(resolveVariable(TestVariableGroups, name)).toBeUndefined();
    });
});


describe("VariableNode", () => {
    const type = schema.nodes.variable;

    it("should be an inline node", () => {
        expect(type.isInline).toBe(true);
        expect(type.isBlock).toBe(false);
    });

    it("should be atomic", () => {
        expect(type.isAtom).toBe(true);
    });

    it("should not accept content", () => {
        expect(type.spec.content).toBeUndefined();
    });

    it("should define the expected attributes", () => {
        const node = type.create();

        expect(node.attrs).toEqual({
            name: null,
            title: null,
            description: null,
            icon: null,
        });
    });

    it("should parse a variable from HTML", () => {
        const doc = parseHTML(
            '<p>Hello <span data-block="variable" data-block-variable="user.firstName"></span>!</p>',
        );

        expect(doc.toJSON()).toEqual({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        { type: "text", text: "Hello " },
                        {
                            type: "variable",
                            attrs: {
                                name: "user.firstName",
                                title: "First name",
                                description: "The user's first name",
                                icon: "mdi-account",
                            },
                        },
                        { type: "text", text: "!" },
                    ],
                },
            ],
        });
    });

    it("should serialize a variable to HTML", () => {
        const doc = schema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "variable",
                            attrs: {
                                name: "user.firstName",
                                title: "First name",
                                description: "The user's first name",
                                icon: "mdi-account",
                            },
                        },
                    ],
                },
            ],
        });

        expect(renderHTML(doc)).toBe(
            '<p><span data-block="variable" data-block-variable="user.firstName" class="tiptap-variable-node"></span></p>',
        );
    });

    it("should ignore variables that do not exist", () => {
        const doc = parseHTML(
            '<p><span data-block="variable" data-block-variable="user.unknown"></span></p>',
        );

        expect(doc.toJSON()).toEqual({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                },
            ],
        });
    });
});


describe("IfVariableNode", () => {
    const type = schema.nodes.ifvariable;

    it("should be a block node", () => {
        expect(type.isBlock).toBe(true);
        expect(type.isInline).toBe(false);
    });

    it("should not be atomic", () => {
        expect(type.isAtom).toBe(false);
    });

    it("should accept block content", () => {
        expect(type.spec.content).toBe("block*");
        // expect(type.isTextblock).toBe(true);
    });

    it("should parse a conditional block from HTML", () => {
        const doc = parseHTML(
            '<div data-block="ifvariable" data-block-variable="user.firstName"><p>Hello <strong>world</strong></p></div>',
        );

        expect(doc.toJSON()).toEqual({
            type: "doc",
            content: [
                {
                    type: "ifvariable",
                    attrs: {
                        name: "user.firstName",
                        title: "First name",
                        description: "The user's first name",
                        icon: "mdi-account",
                    },
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                { type: "text", text: "Hello " },
                                {
                                    type: "text",
                                    text: "world",
                                    marks: [{ type: "bold" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it("should serialize a conditional block with its content", () => {
        const doc = schema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "ifvariable",
                    attrs: {
                        name: "user.firstName",
                        title: "First name",
                        description: "The user's first name",
                        icon: "mdi-account",
                    },
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                { type: "text", text: "Hello " },
                                {
                                    type: "text",
                                    text: "world",
                                    marks: [{ type: "bold" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        expect(renderHTML(doc)).toBe(
            '<div data-block="ifvariable" data-block-variable="user.firstName" class="tiptap-ifvariable-node"><p>Hello <strong>world</strong></p></div>',
        );
    });

    it("should preserve empty content", () => {
        const doc = schema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "ifvariable",
                    attrs: {
                        name: "user.firstName",
                    },
                    content: [],
                },
            ],
        });

        expect(doc.firstChild?.type.name).toBe("ifvariable");
        expect(doc.firstChild?.content.size).toBe(0);
    });

    it("should ignore variables that do not exist", () => {
        const doc = parseHTML(
            '<div data-block="ifvariable" data-block-variable="user.unknown"><p>Hello</p></div>',
        );

        expect(doc.toJSON()).not.toMatchObject({
            content: [
                {
                    type: "ifvariable",
                },
            ],
        });
    });
});
