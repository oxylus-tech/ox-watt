import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import OwToolsetList from '@/ui/components/actions/OwToolsetList.vue';
import { createAction, createToolset } from './fixtures';

const VListStub = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
        return () => h(
            'div',
            {
                ...attrs,
                class: ['v-list', attrs.class],
            },
            slots.default?.(),
        );
    },
});

const ActionListItemStub = defineComponent({
    props: ['action'],
    template: '<div class="action-list-item">{{ action.definition.title }}</div>',
});

describe('OwToolsetList', () => {
    it('renders the toolset inside a v-list', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetList, {
            props: { toolset },
            global: {
                stubs: {
                    VList: VListStub,
                    VListSubheader: true,
                },
            },
        });

        expect(wrapper.find('.v-list').exists()).toBe(true);
    });

    it('forwards attributes to v-list', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetList, {
            props: { toolset },
            attrs: {
                density: 'compact',
                class: 'custom-list',
            },
            global: {
                stubs: {
                    VList: VListStub,
                },
            },
        });

        expect(wrapper.find('.custom-list').exists()).toBe(true);
        expect(wrapper.find('[density="compact"]').exists()).toBe(true);
    });

    it('displays the toolset title when showTitle is enabled', () => {
        const toolset = createToolset('root', [], 'My tools');

        const wrapper = mount(OwToolsetList, {
            props: {
                toolset,
                showTitle: true,
            },
            global: {
                stubs: {
                    VList: VListStub,
                    VListSubheader: {
                        template: '<div class="subheader"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.find('.subheader').text()).toBe('My tools');
    });

    it('does not display the title when showTitle is disabled', () => {
        const toolset = createToolset('root', [], 'My tools');

        const wrapper = mount(OwToolsetList, {
            props: {
                toolset,
                showTitle: false,
            },
            global: {
                stubs: {
                    VList: VListStub,
                    VListSubheader: {
                        template: '<div class="subheader"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.find('.subheader').exists()).toBe(false);
    });

    it('renders actions using OwActionListItem by default', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolsetList, {
            props: { toolset },
            global: {
                stubs: {
                    VList: VListStub,
                    OwActionListItem: ActionListItemStub,
                },
            },
        });

        expect(wrapper.find('.action-list-item').text()).toBe('Save');
    });

    it('forwards a custom action slot', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolsetList, {
            props: { toolset },
            slots: {
                action: ({ action }) => h(
                    'div',
                    { class: 'custom-action' },
                    action.definition.title,
                ),
            },
            global: {
                stubs: {
                    VList: VListStub,
                },
            },
        });

        expect(wrapper.find('.custom-action').text()).toBe('Save');
        expect(wrapper.find('.action-list-item').exists()).toBe(false);
    });

    it('forwards prepend and append slots', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetList, {
            props: { toolset },
            slots: {
                prepend: '<div class="prepend">Before</div>',
                append: '<div class="append">After</div>',
            },
            global: {
                stubs: {
                    VList: VListStub,
                },
            },
        });

        expect(wrapper.find('.prepend').text()).toBe('Before');
        expect(wrapper.find('.append').text()).toBe('After');
    });
});
