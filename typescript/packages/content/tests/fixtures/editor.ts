import { shallowRef } from "vue";
import { Editor, Node, Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import { NodeSelection } from "@tiptap/pm/state";

import type { RichTextContext } from "../../src/types";

export function createTestEditor(): Editor {
    return new Editor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],
    });
}


/**
 * Creates a minimal editor extension for tests.
 *
 * @returns A TipTap extension.
 */
export function createTestExtension() {
    return Extension.create({
        name: "testExtension",
    });
}


/**
 * Creates the minimal document schema required by TipTap.
 *
 * @returns Document, paragraph and text node extensions.
 */
export function createMinimalSchemaExtensions() {
    return [
        Node.create({
            name: "doc",
            topNode: true,
            content: "block+",
        }),
        Node.create({
            name: "paragraph",
            group: "block",
            content: "inline*",
            parseHTML() {
                return [{ tag: "p" }];
            },
            renderHTML() {
                return ["p", 0];
            },
        }),
        Node.create({
            name: "text",
            group: "inline",
        }),
    ];
}


/**
 * Creates a minimal rich-text context around an editor instance.
 *
 * @param editor - TipTap editor instance.
 * @returns Rich-text context suitable for action tests.
 */
export function createTestRichTextContext(editor: Editor): RichTextContext {
    return {
        editor: shallowRef(editor),
        reset: () => undefined,
        chain: (action, ...args) => {
            const chain = editor.chain().focus();
            const command = (chain as any)[action];

            if (typeof command !== "function") {
                throw new Error(`Unknown TipTap command "${action}".`);
            }

            return command.apply(chain, args);
        },
        runChain: (action, ...args) => {
            const chain = editor.chain().focus();
            const command = (chain as any)[action];

            if (typeof command !== "function") {
                throw new Error(`Unknown TipTap command "${action}".`);
            }

            return command.apply(chain, args).run();
        },
        run: () => undefined,
    } as RichTextContext;
}
