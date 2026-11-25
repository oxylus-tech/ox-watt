import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import OwToolset from '@/ui/components/toolsets/OwToolset.vue';
import { createAction, createToolset } from './fixtures';

const OwActionStub = defineComponent({
    props: ['action'],
    template: '<div class="action">{{ action.definition.title }}</div>',
});

describe('OwToolset', () => {
    it('renders its action children', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolset, {
            props: { toolset },
            global: {
                stubs: {
                    OwAction: OwActionStub,
                },
            },
        });

        expect(wrapper.find('.action').text()).toBe('Save');
    });

    it('renders nested toolsets recursively', () => {
        const action = createAction();
        const nested = createToolset('nested', [action], 'Nested');
        const root = createToolset('root', [nested]);

        const wrapper = mount(OwToolset, {
            props: { toolset: root },
            global: {
                stubs: {
                    OwAction: OwActionStub,
                },
            },
        });

        expect(wrapper.findAll('.action')).toHaveLength(1);
        expect(wrapper.find('.action').text()).toBe('Save');
    });

    it('ignores children that cannot be resolved', () => {
        const toolset = {
            definition: {
                name: 'root',
                items: [{ name: 'missing' }],
            },
            get: () => undefined,
        };

        const wrapper = mount(OwToolset, {
            props: { toolset },
        });

        expect(wrapper.findAll('.action')).toHaveLength(0);
    });

    it('exposes the resolved items to the default slot', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolset, {
            props: { toolset },
            slots: {
                default: ({ items }) => h(
                    'div',
                    { class: 'custom-content' },
                    `${items.length} items`,
                ),
            },
        });

        expect(wrapper.find('.custom-content').text()).toBe('1 items');
        expect(wrapper.find('.action').exists()).toBe(false);
    });

    it('supports the prepend and append slots', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolset, {
            props: { toolset },
            slots: {
                prepend: '<div class="prepend">Before</div>',
                append: '<div class="append">After</div>',
            },
        });

        expect(wrapper.find('.prepend').text()).toBe('Before');
        expect(wrapper.find('.append').text()).toBe('After');
    });

    it('supports the item slot', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolset, {
            props: { toolset },
            slots: {
                item: ({ item }) => h(
                    'div',
                    { class: 'custom-item' },
                    item.definition.name,
                ),
            },
        });

        expect(wrapper.find('.custom-item').text()).toBe('save');
        expect(wrapper.find('.action').exists()).toBe(false);
    });

    it('supports the action slot', () => {
        const action = createAction();
        const toolset = createToolset('root', [action]);

        const wrapper = mount(OwToolset, {
            props: { toolset },
            slots: {
                action: ({ action }) => h(
                    'div',
                    { class: 'custom-action' },
                    action.definition.title,
                ),
            },
        });

        expect(wrapper.find('.custom-action').text()).toBe('Save');
        expect(wrapper.find('.action').exists()).toBe(false);
    });

    it('supports the toolset slot', () => {
        const nested = createToolset('nested', [], 'Nested');
        const root = createToolset('root', [nested]);

        const wrapper = mount(OwToolset, {
            props: { toolset: root },
            slots: {
                toolset: ({ toolset }) => h(
                    'div',
                    { class: 'custom-toolset' },
                    toolset.definition.title,
                ),
            },
        });

        expect(wrapper.find('.custom-toolset').text()).toBe('Nested');
    });
});
