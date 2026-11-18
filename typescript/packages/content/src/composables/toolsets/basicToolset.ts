import type { Editor } from "@tiptap/core";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import type { EditorToolset } from "../../types/editor";
import { createToolsetAction, type ToolsetAction } from "./toolset";

/**
 * Identifiers of the actions provided by the basic toolset.
 */
export type BasicToolsetActionName =
    | "bold"
    | "italic"
    | "underline"
    | "strike"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "bulletList"
    | "orderedList"
    | "undo"
    | "redo";

/**
 * Create the basic toolset registration definition.
 *
 * @returns The basic toolset definition.
 */
export function createBasicToolset(): EditorToolset {
    return {
        name: "basic",
        extensions: [
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
    };
}

/**
 * Create the actions displayed by the basic toolset.
 *
 * @returns The toolbar action definitions.
 */
export function createBasicToolsetActions(): ToolsetAction[] {
    const namespace = "ow-content.toolsets.basic.actions";

    /**
     * Create an action backed by a TipTap command.
     *
     * @param name Action identifier.
     * @param icon Material Design Icon identifier.
     * @param command Command availability and execution callback.
     * @param isActive Optional active-state callback.
     * @returns The toolbar action.
     */
    function createCommandAction(
        name: BasicToolsetActionName,
        icon: string,
        command: (editor: Editor) => boolean,
        isActive?: (editor: Editor) => boolean,
    ): ToolsetAction {
        return createToolsetAction({
            name,
            icon,
            namespace,
            canExecute: command,
            execute: (editor) => {
                command(editor);
            },
            isActive,
        });
    }

    return [
        createCommandAction(
            "bold",
            "mdi-format-bold",
            (editor) => editor.can().chain().focus().toggleBold().run(),
            (editor) => editor.isActive("bold"),
        ),
        createCommandAction(
            "italic",
            "mdi-format-italic",
            (editor) => editor.can().chain().focus().toggleItalic().run(),
            (editor) => editor.isActive("italic"),
        ),
        createCommandAction(
            "underline",
            "mdi-format-underline",
            (editor) => editor.can().chain().focus().toggleUnderline().run(),
            (editor) => editor.isActive("underline"),
        ),
        createCommandAction(
            "strike",
            "mdi-format-strikethrough",
            (editor) => editor.can().chain().focus().toggleStrike().run(),
            (editor) => editor.isActive("strike"),
        ),
        createCommandAction(
            "alignLeft",
            "mdi-format-align-left",
            (editor) => editor.can().chain().focus().setTextAlign("left").run(),
            (editor) => editor.isActive({ textAlign: "left" }),
        ),
        createCommandAction(
            "alignCenter",
            "mdi-format-align-center",
            (editor) => editor.can().chain().focus().setTextAlign("center").run(),
            (editor) => editor.isActive({ textAlign: "center" }),
        ),
        createCommandAction(
            "alignRight",
            "mdi-format-align-right",
            (editor) => editor.can().chain().focus().setTextAlign("right").run(),
            (editor) => editor.isActive({ textAlign: "right" }),
        ),
        createCommandAction(
            "bulletList",
            "mdi-format-list-bulleted",
            (editor) => editor.can().chain().focus().toggleBulletList().run(),
            (editor) => editor.isActive("bulletList"),
        ),
        createCommandAction(
            "orderedList",
            "mdi-format-list-numbered",
            (editor) => editor.can().chain().focus().toggleOrderedList().run(),
            (editor) => editor.isActive("orderedList"),
        ),
        createCommandAction(
            "undo",
            "mdi-undo",
            (editor) => editor.can().chain().focus().undo().run(),
        ),
        createCommandAction(
            "redo",
            "mdi-redo",
            (editor) => editor.can().chain().focus().redo().run(),
        ),
    ];
}
