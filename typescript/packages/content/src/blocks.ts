import { Node, type NodeConfig } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

import OwVariableNode from './components/blocks/OwVariableNode';
import {Variable, VariableGroup, BlockAction, VariableAction} from "./types/blocks"


/**
 * Options shared by block node extensions.
 */
export interface BlockNodeOptions<
    TBlock extends BlockAction = BlockAction
> {
    /** Block definition associated with the node. */
    block: TBlock | null;

    /**
     * Optional title displayed by the node view.
     *
     * Overrides the one provided by block.
     */
    title?: string;
}


export interface VariableNodeOptions
    extends BlockNodeOptions<VariableAction>
{
}


export interface CreateBlockNodeOptions<
    TOptions extends BlockNodeOptions = BlockNodeOptions
>
    extends Partial<Omit<NodeConfig<TOptions>, "name">>
{
    /** Whether the node is inline or not. **/
    inline?: boolean;

    /** Default node options (provided by addOptions). **/
    options?: Omit<TOptions, "block">;
}


/**
 * Resolves a variable from a collection of variable groups.
 *
 * @param variables - Variable groups to search.
 * @param name - Dotted variable path in the form "group.variable".
 * @returns The matching variable, or undefined if the path is invalid or unknown.
 */
export function resolveVariable(
    variables: VariableGroup[],
    name: string,
): Variable | undefined {
    const parts = name.split(".");

    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        return undefined;
    }

    const [groupName, variableName] = parts;
    const group = variables.find(group => group.name === groupName);

    return group?.items?.find(variable => variable.name === variableName);
}


/**
 * Creates the base configuration for a block node.
 *
 * @param name - Programmatic name of the node.
 * @param options - Options.
 * @returns TipTap node configuration.
 */
function createBlockNodeConfig<
    TOptions extends BlockNodeOptions = BlockNodeOptions
>(
    name: string,
    options: CreateBlockNodeOptions<TOptions> = {},
): Partial<NodeConfig<TOptions>> {
    const {inline, options: nodeOptions, ...nodeConfig} = options

    return {
        ...nodeConfig,
        name,
        inline,
        group: inline ? 'inline' : 'block',
        content: options.content ?? inline ? undefined : 'block*',
        atom: options.atom ?? inline,
        isolating: options.isolating ?? !inline,
        draggable: options.draggable ?? inline,

        addOptions(): TOptions {
            return {
                block: null,
                ...(nodeOptions ?? {}),
            };
        },
    };
}


/**
 * Creates a variable node extension configuration.
 *
 * @param name - Programmatic name of the node.
 * @param options - options.
 * @returns TipTap node configuration.
 */
function createVariableNodeConfig<
    TOptions extends VariableNodeOptions = VariableNodeOptions
>(
    name: string,
    options?: CreateBlockNodeOptions<TOptions>,
): Partial<NodeConfig<TOptions>> {
    const inline = options?.inline;
    const tag = inline ? 'span' : 'div';

    return {
        ...createBlockNodeConfig(name, options),

        addAttributes(): Record<keyof Variable, { default: null }> {
            return {
                name: { default: null },
                title: { default: null },
                description: { default: null },
                icon: { default: null },
            };
        },

        parseHTML() {
            return [
                {
                    tag: `${tag}[data-block]`,

                    getAttrs: (element: HTMLElement) => {
                        if (element.dataset.block !== name)
                            return false;

                        const variableName = element.dataset.blockVariable;
                        const block = this.options.block

                        if(!variableName || !block)
                            return false

                        const variable = resolveVariable(block.variables, variableName)
                        if (!variable)
                            return false;

                        return {
                            name: variableName,
                            title: variable.title,
                            description: variable.description ?? null,
                            icon: variable.icon ?? null,
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
            return VueNodeViewRenderer(OwVariableNode);
        },
    };
}

/** Inline variable node extension. */
export const VariableNode = Node.create<VariableNodeOptions>(
    createVariableNodeConfig('variable', {inline: true}),
);

/** Conditional block node extension. */
export const IfVariableNode = Node.create<VariableNodeOptions>(
    createVariableNodeConfig('ifvariable'),
);
