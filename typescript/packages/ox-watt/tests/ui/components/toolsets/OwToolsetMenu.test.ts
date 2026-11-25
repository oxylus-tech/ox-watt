import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import OwToolsetMenu from '@/ui/components/toolsets/OwToolsetMenu.vue';
import { createToolset } from './fixtures';

const VMenuStub = defineComponent({
    props: ['activator', 'openOnFocus', 'openOnHover', 'submenu'],
    setup(props, { slots }) {
        return () => h('div', {
            class: 'menu',
            'data-activator': props.activator ?? '',
            'data-open-on-focus': String(props.openOnFocus),
            'data-open-on-hover': String(props.openOnHover),
            'data-submenu': String(props.submenu),
        }, [
            slots.activator?.({ props: { 'data-activator-prop': 'true' } }),
            slots.default?.(),
        ]);
    },
});

const VBtnStub = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
        return () => h('button', {
            ...attrs,
            class: ['button', attrs.class],
        }, slots.default?.());
    },
});

const ToolsetListStub = defineComponent({
    props: ['toolset'],
    setup(_, { slots }) {
        return () => h('div', { class: 'toolset-list' }, [
            slots.prepend?.(),
            slots.default?.(),
            slots.action?.({ action: { definition: { name: 'save', title: 'Save' } } }),
            slots.append?.(),
        ]);
    },
});

describe('OwToolsetMenu', () => {
    it('renders a menu with the toolset title as its activator', () => {
        const toolset = createToolset('root', [], 'My tools');

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.button').text()).toBe('My tools');
    });

    it('uses the toolset icon on the default activator', () => {
        const toolset = createToolset('root', [], 'My tools', 'mdi-tools');

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.button').attributes('prepend-icon')).toBe('mdi-tools');
    });

    it('forwards attributes to the default activator', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            attrs: {
                id: 'tools-menu',
                class: 'custom-activator',
            },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.button').attributes('id')).toBe('tools-menu');
        expect(wrapper.find('.button').classes()).toContain('custom-activator');
    });

    it('supports a custom activator slot', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            slots: {
                activator: ({ 'data-activator-prop': activatorProp }) => h(
                    'button',
                    { class: 'custom-activator' },
                    activatorProp,
                ),
            },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.custom-activator').text()).toBe('true');
        expect(wrapper.find('.button').exists()).toBe(false);
    });

    it('configures a root menu to open on focus', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.menu').attributes('data-open-on-focus')).toBe('true');
        expect(wrapper.find('.menu').attributes('data-open-on-hover')).toBe('false');
        expect(wrapper.find('.menu').attributes('data-submenu')).toBe('false');
    });

    it('configures a nested menu to open on hover', () => {
        const toolset = createToolset('nested', []);

        const wrapper = mount(OwToolsetMenu, {
            props: {
                toolset,
                nested: true,
            },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.menu').attributes('data-activator')).toBe('parent');
        expect(wrapper.find('.menu').attributes('data-open-on-focus')).toBe('false');
        expect(wrapper.find('.menu').attributes('data-open-on-hover')).toBe('true');
        expect(wrapper.find('.menu').attributes('data-submenu')).toBe('true');
        expect(wrapper.find('.button').exists()).toBe(false);
    });

    it('forwards action slots to OwToolsetList', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetMenu, {
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
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.custom-action').text()).toBe('Save');
    });

    it('forwards prepend and append slots to OwToolsetList', () => {
        const toolset = createToolset('root', []);

        const wrapper = mount(OwToolsetMenu, {
            props: { toolset },
            slots: {
                prepend: '<div class="prepend">Before</div>',
                append: '<div class="append">After</div>',
            },
            global: {
                stubs: {
                    VMenu: VMenuStub,
                    VBtn: VBtnStub,
                    OwToolsetList: ToolsetListStub,
                },
            },
        });

        expect(wrapper.find('.prepend').text()).toBe('Before');
        expect(wrapper.find('.append').text()).toBe('After');
    });
});
