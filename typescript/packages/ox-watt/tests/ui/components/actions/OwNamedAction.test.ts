import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import OwNamedAction from '@/ui/components/actions/OwNamedAction.vue';
import { createAction, createToolset } from './fixtures';

const VBtnStub = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
        return () => h(
            'button',
            {
                ...attrs,
                disabled: Boolean(attrs.disabled),
                'data-testid': 'action-button',
            },
            slots.default?.(),
        );
    },
});

describe('OwNamedAction', () => {
    it('renders the action resolved by name', () => {
        const action = createAction('save', 'Save changes');
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'save',
                toolset,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').text())
            .toBe('Save changes');
    });

    it('does not render when the action cannot be resolved', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'missing',
                toolset,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.find('[data-testid="action-button"]').exists()).toBe(false);
    });

    it('renders the requested action when the toolset contains multiple actions', () => {
        const saveAction = createAction('save', 'Save');
        const deleteAction = createAction('delete', 'Delete');
        const toolset = createToolset('root', [saveAction, deleteAction]);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'delete',
                toolset,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').text()).toBe('Delete');
    });

    it('forwards attributes to OwAction', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'save',
                toolset,
            },
            attrs: {
                id: 'named-save-action',
                class: 'custom-action',
                'data-custom': 'value',
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        const button = wrapper.get('[data-testid="action-button"]');

        expect(button.attributes('id')).toBe('named-save-action');
        expect(button.classes()).toContain('custom-action');
        expect(button.attributes('data-custom')).toBe('value');
    });

    it('forwards the action slot properties', () => {
        const action = createAction('save', 'Save changes', {
            help: 'Save the current document',
            icon: 'mdi-content-save',
        });
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'save',
                toolset,
            },
            slots: {
                default: ({ action: slotAction, title, help, icon }) => h(
                    'div',
                    { class: 'custom-action' },
                    [
                        h('span', { class: 'action-name' }, slotAction.definition.name),
                        h('span', { class: 'title' }, title),
                        h('span', { class: 'help' }, help),
                        h('span', { class: 'icon' }, icon),
                    ],
                ),
            },
        });

        expect(wrapper.find('.custom-action').exists()).toBe(true);
        expect(wrapper.find('.action-name').text()).toBe('save');
        expect(wrapper.find('.title').text()).toBe('Save changes');
        expect(wrapper.find('.help').text()).toBe('Save the current document');
        expect(wrapper.find('.icon').text()).toBe('mdi-content-save');
        expect(wrapper.find('[data-testid="action-button"]').exists()).toBe(false);
    });

    it('does not render the slot when the action cannot be resolved', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'missing',
                toolset,
            },
            slots: {
                default: '<div class="custom-action">Custom</div>',
            },
        });

        expect(wrapper.find('.custom-action').exists()).toBe(false);
    });

    it('executes the resolved action when its button is clicked', async () => {
        const run = vi.fn(async () => undefined);
        const action = createAction('save', 'Save', { run });
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwNamedAction, {
            props: {
                name: 'save',
                toolset,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        await wrapper.get('[data-testid="action-button"]').trigger('click');

        expect(run).toHaveBeenCalledOnce();
    });
});
