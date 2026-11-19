
import { nextTick } from 'vue';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createVuetify } from 'vuetify';

import OWAutocomplete from '@/components/OwAutocomplete.vue';

const vuetify = createVuetify();

describe('OWAutocomplete', () => {
    /**
     * Mounts OWAutocomplete with the provided props.
     *
     * @param props Additional component props.
     * @returns The mounted wrapper and the search mock.
     */
    function mountComponent(props: Record<string, unknown> = {}) {
        const searchItems = (props.searchItems as ReturnType<typeof vi.fn> | undefined)
            ?? vi.fn().mockResolvedValue([]);

        const wrapper = mount(OWAutocomplete, {
            props: {
                minSearchLength: 3,
                debounce: 300,
                maxWait: 1500,
                ...props,
                searchItems
            },
            global: { plugins: [vuetify] }
        });

        return { wrapper, searchItems };
    }

    /**
     * Updates the search text through Vuetify's update event.
     *
     * @param wrapper Mounted component wrapper.
     * @param query New search text.
     */
    async function updateSearch(wrapper: VueWrapper, query: string): Promise<void> {
        wrapper.findComponent({ name: 'VAutocomplete' }).vm.$emit('update:search', query);
        await nextTick();
    }

    /**
     * Returns the underlying Vuetify autocomplete component.
     *
     * @param wrapper Mounted component wrapper.
     * @returns The VAutocomplete component wrapper.
     */
    function getAutocomplete(wrapper: VueWrapper) {
        return wrapper.findComponent({ name: 'VAutocomplete' });
    }

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    describe('search scheduling', () => {
        it('does not search before the minimum search length is reached', async () => {
            const { wrapper, searchItems } = mountComponent({
                minSearchLength: 3,
                debounce: 300
            });

            await updateSearch(wrapper, 'Br');

            await vi.advanceTimersByTimeAsync(500);

            expect(searchItems).not.toHaveBeenCalled();

            await updateSearch(wrapper, 'Bru');

            await vi.advanceTimersByTimeAsync(299);

            expect(searchItems).not.toHaveBeenCalled();

            await vi.advanceTimersByTimeAsync(1);
            await flushPromises();

            expect(searchItems).toHaveBeenCalledTimes(1);
            expect(searchItems).toHaveBeenCalledWith('Bru');

            wrapper.unmount();
        });

        it('debounces successive search changes', async () => {
            const { wrapper, searchItems } = mountComponent({
                debounce: 300,
                minSearchLength: 1
            });

            await updateSearch(wrapper, 'A');
            await vi.advanceTimersByTimeAsync(200);

            await updateSearch(wrapper, 'Ab');
            await vi.advanceTimersByTimeAsync(200);

            expect(searchItems).not.toHaveBeenCalled();

            await vi.advanceTimersByTimeAsync(100);
            await flushPromises();

            expect(searchItems).toHaveBeenCalledTimes(1);
            expect(searchItems).toHaveBeenCalledWith('Ab');

            wrapper.unmount();
        });

        it('starts a search after maxWait even when the input keeps changing', async () => {
            const { wrapper, searchItems } = mountComponent({
                debounce: 300,
                maxWait: 1000,
                minSearchLength: 1
            });

            await updateSearch(wrapper, 'A');

            await vi.advanceTimersByTimeAsync(200);
            await updateSearch(wrapper, 'Ab');

            await vi.advanceTimersByTimeAsync(200);
            await updateSearch(wrapper, 'Abc');

            await vi.advanceTimersByTimeAsync(200);
            await updateSearch(wrapper, 'Abcd');

            await vi.advanceTimersByTimeAsync(200);
            await updateSearch(wrapper, 'Abcde');

            await vi.advanceTimersByTimeAsync(200);
            await flushPromises();

            expect(searchItems).toHaveBeenCalledTimes(1);
            expect(searchItems).toHaveBeenCalledWith('Abcde');

            wrapper.unmount();
        });
    });

    describe('initial search', () => {
        it('searches the initial value when searchOnMount is enabled', async () => {
            const { wrapper, searchItems } = mountComponent({
                search: 'Brussels',
                searchOnMount: true,
                minSearchLength: 3
            });

            await flushPromises();

            expect(searchItems).toHaveBeenCalledTimes(1);
            expect(searchItems).toHaveBeenCalledWith('Brussels');

            wrapper.unmount();
        });

        it('does not search the initial value when searchOnMount is disabled', async () => {
            const { wrapper, searchItems } = mountComponent({
                search: 'Brussels',
                searchOnMount: false
            });

            await flushPromises();

            expect(searchItems).not.toHaveBeenCalled();

            wrapper.unmount();
        });

        it('does not search an initial value shorter than minSearchLength', async () => {
            const { wrapper, searchItems } = mountComponent({
                search: 'Br',
                searchOnMount: true,
                minSearchLength: 3
            });

            await flushPromises();

            expect(searchItems).not.toHaveBeenCalled();

            wrapper.unmount();
        });
    });

    describe('results', () => {
        it('updates the displayed items when a search succeeds', async () => {
            const results = [{ id: 1, name: 'Brussels' }];

            const { wrapper, searchItems } = mountComponent();

            searchItems.mockResolvedValue(results);

            await updateSearch(wrapper, 'Bru');
            await vi.advanceTimersByTimeAsync(300);
            await flushPromises();

            expect(getAutocomplete(wrapper).props('items')).toEqual(results);

            wrapper.unmount();
        });

        it('keeps the previous results while waiting for a new search', async () => {
            const previousResults = [{ id: 1, name: 'Brussels' }];

            const { wrapper, searchItems } = mountComponent();

            searchItems.mockResolvedValueOnce(previousResults);

            await updateSearch(wrapper, 'Bru');
            await vi.advanceTimersByTimeAsync(300);
            await flushPromises();

            await updateSearch(wrapper, 'Brux');

            expect(getAutocomplete(wrapper).props('items')).toEqual(previousResults);

            wrapper.unmount();
        });

        it('keeps the previous results when a search fails', async () => {
            const previousResults = [{ id: 1, name: 'Brussels' }];
            const error = new Error('Search failed');

            const { wrapper, searchItems } = mountComponent();

            searchItems
                .mockResolvedValueOnce(previousResults)
                .mockRejectedValueOnce(error);

            await updateSearch(wrapper, 'Bru');
            await vi.advanceTimersByTimeAsync(300);
            await flushPromises();

            await updateSearch(wrapper, 'Brux');
            await vi.advanceTimersByTimeAsync(300);
            await flushPromises();

            expect(getAutocomplete(wrapper).props('items')).toEqual(previousResults);
            expect(wrapper.emitted('error')).toEqual([[error]]);

            wrapper.unmount();
        });

        it('clears results when the search becomes shorter than minSearchLength', async () => {
            const results = [{ id: 1, name: 'Brussels' }];

            const { wrapper, searchItems } = mountComponent({
                minSearchLength: 3,
                debounce: 0
            });

            searchItems.mockResolvedValue(results);

            await updateSearch(wrapper, 'Brussels');
            await vi.advanceTimersByTimeAsync(0);
            await flushPromises();

            expect(getAutocomplete(wrapper).props('items')).toEqual(results);

            await updateSearch(wrapper, 'Br');
            await flushPromises();

            expect(searchItems).toHaveBeenCalledTimes(1);
            expect(getAutocomplete(wrapper).props('items')).toEqual([]);

            wrapper.unmount();
        });
    });

    describe('concurrent searches', () => {
        it('ignores the response of an outdated request', async () => {
            let resolveFirst!: (value: unknown[]) => void;
            let resolveSecond!: (value: unknown[]) => void;

            const searchItems = vi.fn()
                .mockImplementationOnce(() => new Promise(resolve => {
                    resolveFirst = resolve;
                }))
                .mockImplementationOnce(() => new Promise(resolve => {
                    resolveSecond = resolve;
                }));

            const { wrapper } = mountComponent({
                searchItems,
                minSearchLength: 1,
                debounce: 300
            });

            await updateSearch(wrapper, 'Bru');
            await vi.advanceTimersByTimeAsync(300);

            expect(searchItems).toHaveBeenCalledTimes(1);

            await updateSearch(wrapper, 'Brux');

            resolveFirst([{ id: 1, name: 'Old result' }]);
            await flushPromises();

            expect(getAutocomplete(wrapper).props('items')).toEqual([]);

            await vi.advanceTimersByTimeAsync(300);

            expect(searchItems).toHaveBeenCalledTimes(2);

            resolveSecond([{ id: 2, name: 'New result' }]);
            await flushPromises();

            expect(getAutocomplete(wrapper).props('items')).toEqual([
                { id: 2, name: 'New result' }
            ]);

            wrapper.unmount();
        });
    });

    describe('selection', () => {
        it('forwards the selected value independently from search results', async () => {
            const selected = { id: 42, name: 'Existing selection' };

            const { wrapper } = mountComponent({
                modelValue: selected
            });

            const autocomplete = getAutocomplete(wrapper);

            expect(autocomplete.props('modelValue')).toEqual(selected);

            autocomplete.vm.$emit('update:modelValue', selected);

            expect(wrapper.emitted('update:modelValue')).toEqual([[selected]]);

            wrapper.unmount();
        });
    });

    describe('Vuetify integration', () => {
        it('disables Vuetify local filtering', () => {
            const { wrapper } = mountComponent();

            expect(getAutocomplete(wrapper).props('noFilter')).toBe(true);

            wrapper.unmount();
        });

        it('combines external and internal loading states', async () => {
            const { wrapper } = mountComponent({
                loading: true
            });

            expect(getAutocomplete(wrapper).props('loading')).toBe(true);

            wrapper.unmount();
        });
    });

    describe('lifecycle', () => {
        it('does not execute a pending search after unmount', async () => {
            const { wrapper, searchItems } = mountComponent({
                minSearchLength: 1,
                debounce: 300
            });

            await updateSearch(wrapper, 'Bru');

            wrapper.unmount();

            await vi.advanceTimersByTimeAsync(300);

            expect(searchItems).not.toHaveBeenCalled();
        });
    });
});
