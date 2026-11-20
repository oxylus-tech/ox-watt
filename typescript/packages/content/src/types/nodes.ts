import type { NodeConfig } from "@tiptap/core"


import { Node } from '@tiptap/core'
import type { NodeConfig } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import OxVariableNode from './components/OxVariableNode'


function NodeConfig({inline=false, ...options}) {
    if(!inline)
        options = {
            group: 'block',
            content: 'inline*',
            isolating: true,
            atom: false,
            inline: false,
            ...options
        }
    else
        options = {
            group: "inline",
            atom: true,
            inline: true,
            draggable: true,
            ...options
        }

    return {
        ...options,

        tag: inline ? "span" : "div",

        addOptions() {
            const options = { block: null}
            if(!inline)
                options.title = ""
            return options
        },
    }
}


function VariableNodeConfig(options_) {
    const {tag, name, addOptions, ...options} = NodeConfig(options_)

    const inline = options_.inline
    return {
        name: name,
        ...options,

        addOptions() {
            return { ...addOptions(), variables: [] }
        },

        addAttributes() {
            return {
                name: { default: null, },
                label: { default: null, },
                description: { default: null, },
            }
        },

        parseHTML() {
            return [
                {
                    tag: `${tag}[data-block]`,
                    getAttrs: el => {
                        if(el.dataset.block != name)
                            return false

                        const variable = el.dataset.blockVariable
                        const ph = this.options.variables.find(p => p.name == variable)

                        if(!ph)
                            return false
                        return {name: variable, label: ph.label, description: ph.description}
                    }
                },
            ]
        },

        renderHTML({ node }) {
            // stored version (backend): {{ name }}
            return [
                tag,
                {
                    'data-block': name,
                    'data-block-variable': node.attrs.name,
                    class: `tiptap-${name}-node`,
                },
                inline ? "" : 0,
            ]
        },

        addNodeView() {
            return VueNodeViewRenderer(OxVariableNode)
        },

    }
}


/**
 * Provide a variable node in tiptap rich text editor, based on `ox.apps.content.blocks.Variable`.
 *
 * User configure extension with a list of variables as ``{name, label, description}``
 * to sanitize user input.
 *
 * The node has also those values as attributes for rendering a single variable.
 *
 * Rendered node is ``<span>``.
 */
export const Variable = Node.create(VariableNodeConfig({
    name: "variable", inline: true,
}))

export const IfVariable = Node.create(VariableNodeConfig({
    name: "ifvariable",
}))



/**
 * Provide a variable node in tiptap rich text editor, based on `ox.apps.content.blocks.Variable`.
 *
 * User configure extension with a list of variables as ``{name, label, description}``
 * to sanitize user input.
 *
 * The node has also those values as attributes for rendering a single variable.
 *
 * Rendered node is ``<span>``.
 */
/*export const Variable = Node.create({
    name: 'variable',

    inline: true,
    group: 'inline',
    atom: true,

    parseHTML() {
        return [
            {
                tag: 'span[data-block="variable"]',
                getAttrs: el => {
                    const name = el.dataset.variable
                    const ph = this.options.variables.find(p => p.name == name)

                    if(!ph)
                        return false
                    return {name: ph.name, label: ph.label, description: ph.description}
                }
            },
        ]
    },

    renderHTML({ node }) {
        // stored version (backend): {{ name }}
        return [
            'span',
            {
                'data-block': 'variable',
                'data-block-variable': node.attrs.name,
                class: 'tiptap-variable-node',
            },
            `{{ ${node.attrs.name} }}`,
        ]
    },
})*/


/**
 * Add conditional variable node to tiptap editor, based on `ox.apps.content.blocks.IfVariable`.
 *
 * Content of the node is rendered only if the provided variable is set.
 */
/*export const IfVariable = Node.create({
    name: 'if_variable',

    group: 'block',
    content: 'inline*',
    atom: false,
    draggable: true,

    addOptions() {
        return {
            variables: [],
        }
    },

    addAttributes() {
        return {
            variable: { default: '', },
            label: {default: '', }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-block="if_variable"]',
                getAttrs: el => ({
                    variable: el.getAttribute('data-block-variable') || '',
                }),
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            'div',
            {
                'data-block': 'if_variable',
                'data-block-variable': node.attrs.condition,
                ...HTMLAttributes,
            },
            0, // render inner content
        ]
    },

    addNodeView() {
        return ({ node, editor, getPos }) => {
            const container = document.createElement('div')
            container.classList.add('tiptap-if-variable-node')

            // top label
            const label = document.createElement('div')
            label.classList.add('tiptap-if-variable-label')
            label.innerHTML = (
                '<span class="v-icon"><i class="mdi mdi-application-variable-outline"></i></span> ' +
                node.attrs.label || node.attrs.condition
            )

            // editable content
            const content = document.createElement('div')
            content.classList.add('tiptap-if-variable-content')
            content.contentEditable = 'true'

            container.appendChild(label)
            container.appendChild(content)

            return { dom: container, contentDOM: content, }
        }
    },
})*/
