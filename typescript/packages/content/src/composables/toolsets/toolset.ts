import type { Editor } from "@tiptap/core";

/**
 * Definition of a toolbar action.
 */
export interface ToolsetAction {
    /**
     * Unique action identifier.
     */
    name: string;

    /**
     * Material Design Icon identifier.
     */
    icon: string;

    /**
     * Translation key for the action title.
     */
    titleKey: string;

    /**
     * Translation key for the action help text.
     */
    helpKey: string;

    /**
     * Translation key for the accessible label.
     */
    ariaLabelKey: string;

    /**
     * Translation key for the accessible description.
     */
    descriptionKey: string;

    /**
     * Check whether the action is currently active.
     *
     * @param editor TipTap editor instance.
     * @returns Whether the action is active.
     */
    isActive(editor: Editor): boolean;

    /**
     * Check whether the action can currently be executed.
     *
     * @param editor TipTap editor instance.
     * @returns Whether the action can be executed.
     */
    isEnabled(editor: Editor): boolean;

    /**
     * Execute the action.
     *
     * @param editor TipTap editor instance.
     */
    execute(editor: Editor): void;
}

/**
 * Options used to create a toolbar action.
 */
export interface CreateToolsetActionOptions {
    /**
     * Unique action identifier.
     */
    name: string;

    /**
     * Material Design Icon identifier.
     */
    icon: string;

    /**
     * Translation namespace.
     */
    namespace: string;

    /**
     * Check whether the action is currently active.
     *
     * @param editor TipTap editor instance.
     * @returns Whether the action is active.
     */
    isActive?: (editor: Editor) => boolean;

    /**
     * Check whether the action can currently be executed.
     *
     * @param editor TipTap editor instance.
     * @returns Whether the action can be executed.
     */
    canExecute: (editor: Editor) => boolean;

    /**
     * Execute the action.
     *
     * @param editor TipTap editor instance.
     */
    execute: (editor: Editor) => void;
}

/**
 * Create a toolbar action with standardized translation keys.
 *
 * @param options Action configuration.
 * @returns A reusable toolbar action definition.
 */
export function createToolsetAction(
    options: CreateToolsetActionOptions,
): ToolsetAction {
    const key = `${options.namespace}.${options.name}`;

    return {
        name: options.name,
        icon: options.icon,
        titleKey: `${key}.title`,
        helpKey: `${key}.help`,
        ariaLabelKey: `${key}.ariaLabel`,
        descriptionKey: `${key}.description`,
        isActive: options.isActive ?? (() => false),
        isEnabled: options.canExecute,
        execute: options.execute,
    };
}
