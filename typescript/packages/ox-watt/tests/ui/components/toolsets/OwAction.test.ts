import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import OwAction from '@/ui/components/toolsets/OwAction.vue';
import { createAction } from './fixtures';

/**
 * Minimal button stub that preserves attributes and click behavior.
 */
const VBtnStub = defineComponent({
    inheritAttrs: false,
    props: {
        href: String,
        prependIcon: String,
        title: String,
        ariaLabel: String,
        ariaDescription: String,
        disabled: Boolean,
    },
    setup(props, { attrs, slots }) {
        return () => h(
            'button',
            {
                ...attrs,
                'data-href': props.href,
                'data-prepend-icon': props.prependIcon,
                'data-title': props.title,
                'data-aria-label': props.ariaLabel,
                'data-aria-description': props.ariaDescription,
                disabled: props.disabled,
                'data-testid': 'action-button',
            },
            slots.default?.(),
        );
    },
});

describe('OwAction', () => {
    it('renders the action title by default', () => {
        const action = createAction('save', 'Save changes');

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').text())
            .toBe('Save changes');
    });

    it('renders the action presentation properties', () => {
        const action = createAction('save', 'Save changes', {
            help: 'Save the current document',
            icon: 'mdi-content-save',
            href: '/save',
        });

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        const button = wrapper.get('[data-testid="action-button"]');

        expect(button.attributes('href')).toBe('/save');
        expect(button.attributes('prepend-icon')).toBe('mdi-content-save');
        expect(button.attributes('aria-label')).toBe('Save changes');
        expect(button.attributes('aria-description'))
            .toBe('Save the current document');
        expect(button.attributes('title')).toBe('Save the current document');
    });

    it('uses title and help props as presentation overrides', () => {
        const action = createAction('save', 'Save', {
            help: 'Original help',
        });

        const wrapper = mount(OwAction, {
            props: {
                action,
                title: 'Custom title',
                help: 'Custom help',
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        const button = wrapper.get('[data-testid="action-button"]');

        expect(button.text()).toBe('Custom title');
        // expect(button.attributes('aria-label')).toBe('Custom title');
        // expect(button.attributes('aria-description')).toBe('Custom help');
        expect(button.attributes('title')).toBe('Custom help');
    });

    it('uses an empty title when the action has no title', () => {
        const action = createAction('save', '');

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').text()).toBe('');
        expect(wrapper.get('[data-testid="action-button"]').attributes('aria-label'))
            .toBe('');
    });

    it('disables the button when the action is disabled', () => {
        const action = createAction('save', 'Save', {
            isEnabled: () => false,
        });

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').element.disabled)
            .toBe(true);
    });

    it('disables the button when the disabled attribute is provided', () => {
        const action = createAction();

        const wrapper = mount(OwAction, {
            props: { action },
            attrs: {
                disabled: true,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').element.disabled)
            .toBe(true);
    });

    it('hides the button when the action is not visible', () => {
        const action = createAction('save', 'Save', {
            isVisible: () => false,
        });

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').isVisible()).toBe(false);
    });

    it('forwards attributes to the button', () => {
        const action = createAction();

        const wrapper = mount(OwAction, {
            props: { action },
            attrs: {
                id: 'save-action',
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

        expect(button.attributes('id')).toBe('save-action');
        expect(button.classes()).toContain('custom-action');
        expect(button.attributes('data-custom')).toBe('value');
    });

    it('runs the action when the button is clicked', async () => {
        const run = vi.fn(async () => undefined);
        const action = createAction('save', 'Save', { run });

        const wrapper = mount(OwAction, {
            props: { action },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        await wrapper.get('[data-testid="action-button"]').trigger('click');

        expect(run).toHaveBeenCalledOnce();
    });

    it('does not render when no action is provided', () => {
        const wrapper = mount(OwAction, {
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.find('[data-testid="action-button"]').exists()).toBe(false);
    });

    it('exposes the action and its presentation bindings to the slot', () => {
        const action = createAction('save', 'Save', {
            help: 'Save the document',
            icon: 'mdi-content-save',
        });

        const wrapper = mount(OwAction, {
            props: { action },
            slots: {
                default: ({ action: slotAction, title, help, icon, disabled }) => h(
                    'div',
                    { class: 'custom-action' },
                    [
                        h('span', { class: 'title' }, title),
                        h('span', { class: 'help' }, help),
                        h('span', { class: 'icon' }, icon),
                        h('span', { class: 'disabled' }, String(disabled)),
                        h('span', { class: 'action-name' }, slotAction.definition.name),
                    ],
                ),
            },
        });

        expect(wrapper.find('.custom-action').exists()).toBe(true);
        expect(wrapper.find('.title').text()).toBe('Save');
        expect(wrapper.find('.help').text()).toBe('Save the document');
        expect(wrapper.find('.icon').text()).toBe('mdi-content-save');
        expect(wrapper.find('.disabled').text()).toBe('false');
        expect(wrapper.find('.action-name').text()).toBe('save');
        expect(wrapper.find('[data-testid="action-button"]').exists()).toBe(false);
    });

    it('does not render the custom slot when no action is provided', () => {
        const wrapper = mount(OwAction, {
            slots: {
                default: '<div class="custom-action">Custom</div>',
            },
        });

        expect(wrapper.find('.custom-action').exists()).toBe(false);
    });

    it('does not expose help as the button title when noHelp is enabled', () => {
        const action = createAction('save', 'Save', {
            help: 'Save the document',
        });

        const wrapper = mount(OwAction, {
            props: {
                action,
                noHelp: true,
            },
            global: {
                stubs: {
                    VBtn: VBtnStub,
                },
            },
        });

        expect(wrapper.get('[data-testid="action-button"]').attributes('title'))
            .toBe('');
    });
});
