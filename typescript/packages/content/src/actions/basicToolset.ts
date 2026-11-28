import type { Editor } from "@tiptap/core";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import type { EditorToolset, RichTextContext } from "../types/editor";
import { createEditorActions } from "./editor";


export const basicFormatActions = createEditorActions([
    {
        name: "bold",
        icon: "mdi-format-bold",
        command: "toggleBold",
    },
    {
        name: "italic",
        icon: "mdi-format-italic",
        command: "toggleItalic",
    },
    {
        name: "underline",
        icon: "mdi-format-underline",
        command: "toggleUnderline",
    },
    {
        name: "strike",
        icon: "mdi-format-strikethrough",
        command: "toggleStrike",
    },
    {
        name: "alignLeft",
        icon: "mdi-format-align-left",
        command: ["setTextAlign", "left"],
        isActive: { textAlign: "left" },
    },
    {
        name: "alignCenter",
        icon: "mdi-format-align-center",
        command: ["setTextAlign", "center"],
        isActive: { textAlign: "center" },
    },
    {
        name: "alignRight",
        icon: "mdi-format-align-right",
        command: ["setTextAlign", "right"],
        isActive: { textAlign: "right" },
    },
    {
        name: "bulletList",
        icon: "mdi-format-list-bulleted",
        command: "toggleBulletList",
    },
    {
        name: "orderedList",
        icon: "mdi-format-list-numbered",
        command: "toggleOrderedList",
    },
], {i18nPrefix: "ow-content.actions"})


export const basicFormat: EditorToolset = {
    name: "basic-format",
    extensions: [
        Underline,
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
    ],

    items: basicFormatActions
}

/**
 * Basic toolset offering simple formatting and base utils.
 */
export const basicToolset: EditorToolset = {
    name: "basic",

    extensions: basicFormat.extensions,
    items: [
        ...basicFormatActions,
        ...createEditorActions([
            {
                name: "undo",
                icon: "mdi-undo",
                command: "undo",
            },
            {
                name: "redo",
                icon: "mdi-redo",
                command: "redo",
            },
        ])
    ]
}
