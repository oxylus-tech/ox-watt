import { Node, type NodeConfig } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

import OxVariableNode from './components/blocks/OxVariableNode';

/**
 * Describes a block available in the editor.
 */
export interface BlockDefinition {
    /** Programmatic name of the block. */
    name: string;

    /** Whether the block is inline. */
    inline?: boolean;

    /** Title displayed to the user. */
    title: string;

    /** Icon displayed to the user. */
    icon: string;

    /** Description of the block. */
    description: string;

    /** Group used to organize blocks. */
    group: string;
}

/**
 * Describes a variable available in the editor.
 */
export interface BlockVariable {
    /** Programmatic name of the variable. */
    name: string;

    /** Title displayed to the user. */
    title: string;

    /** Description of the variable. */
    description?: string | null;
}

/**
 * Options shared by block node extensions.
 */
export interface BlockNodeOptions {
    /** Block definition associated with the node. */
    block: BlockDefinition | null;

    /** Whether the node is inline. */
    inline: boolean;

    /** Optional title displayed by the node view. */
    title?: string;
}

/**
 * Options for variable node extensions.
 */
export interface VariableNodeOptions extends BlockNodeOptions {
    /** Variables available for this node. */
    variables: BlockVariable[];
}

/**
 * Attributes stored on variable nodes.
 */
export interface VariableNodeAttributes {
    /** Programmatic name of the variable. */
    name: string | null;

    /** Title displayed for the variable. */
    title: string | null;

    /** Description of the variable. */
    description: string | null;
}

/**
 * Creates the base configuration for a block node.
 *
 * @param name - Programmatic name of the node.
 * @param inline - Whether the node is inline.
 * @returns TipTap node configuration.
 */
function createBlockNodeConfig(
    name: string,
    inline = false,
): Partial<NodeConfig<VariableNodeOptions>> {
    return {
        name,
        group: inline ? 'inline' : 'block',
        content: inline ? undefined : 'inline*',
        atom: inline,
        inline,
        isolating: !inline,
        draggable: inline,

        addOptions(): VariableNodeOptions {
            return {
                block: null,
                inline,
                variables: [],
                ...(!inline ? { title: '' } : {}),
            };
        },
    };
}

/**
 * Creates a variable node extension configuration.
 *
 * @param name - Programmatic name of the node.
 * @param inline - Whether the node is inline.
 * @returns TipTap node configuration.
 */
function createVariableNodeConfig(
    name: string,
    inline = false,
): Partial<NodeConfig<VariableNodeOptions>> {
    const tag = inline ? 'span' : 'div';

    return {
        ...createBlockNodeConfig(name, inline),

        addAttributes(): Record<keyof VariableNodeAttributes, { default: null }> {
            return {
                name: { default: null },
                title: { default: null },
                description: { default: null },
            };
        },

        parseHTML() {
            return [
                {
                    tag: `${tag}[data-block]`,

                    getAttrs: (element: HTMLElement) => {
                        if (element.dataset.block !== name) {
                            return false;
                        }

                        const variableName = element.dataset.blockVariable;
                        const variable = this.options.variables.find(
                            (item) => item.name === variableName,
                        );

                        if (!variable) {
                            return false;
                        }

                        return {
                            name: variable.name,
                            title: variable.title,
                            description: variable.description ?? null,
                        };
                    },
                },
            ];
        },

        renderHTML({ node }): DOMOutputSpec {
            const attributes = {
                'data-block': name,
                'data-block-variable': node.attrs.name,
                class: `tiptap-${name}-node`,
            };

            return inline
                ? [tag, attributes]
                : [tag, attributes, 0];
        },

        addNodeView() {
            return VueNodeViewRenderer(OxVariableNode);
        },
    };
}

/** Inline variable node extension. */
export const VariableNode = Node.create<VariableNodeOptions>(
    createVariableNodeConfig('variable', true),
);

/** Conditional block node extension. */
export const IfVariableNode = Node.create<VariableNodeOptions>(
    createVariableNodeConfig('ifvariable'),
);
