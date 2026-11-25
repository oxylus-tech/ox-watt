import { describe, expect, it, vi } from 'vitest';
import type { Slots } from 'vue';

import { mapSlots } from '../../src/utils/mapSlots';

describe('mapSlots', () => {
    const defaultSlot = vi.fn();
    const actionSlot = vi.fn();
    const actionIconSlot = vi.fn();
    const toolsetSlot = vi.fn();

    const slots: Slots = {
        default: defaultSlot,
        'action': actionSlot,
        'action.icon': actionIconSlot,
        'toolset': toolsetSlot,
    };

    it('forwards all slots by default', () => {
        expect(mapSlots(slots)).toEqual(slots);
    });

    it('selects slots matching a prefix and removes the prefix', () => {
        expect(mapSlots(slots, { prefix: 'action.' })).toEqual({
            'icon': actionIconSlot,
        });
    });

    it('returns an empty object when no slot matches the prefix', () => {
        expect(mapSlots(slots, { prefix: 'missing.' })).toEqual({});
    });

    it('selects slots using a filter', () => {
        expect(mapSlots(slots, {
            filter: (name) => name.startsWith('action'),
        })).toEqual({
            'action': actionSlot,
            'action.icon': actionIconSlot,
        });
    });

    it('returns an empty object when no slot matches the filter', () => {
        expect(mapSlots(slots, {
            filter: (name) => name.startsWith('missing'),
        })).toEqual({});
    });

    it('renames slots using the map option', () => {
        expect(mapSlots(slots, {
            map: (name) => `custom.${name}`,
        })).toEqual({
            'custom.default': defaultSlot,
            'custom.action': actionSlot,
            'custom.action.icon': actionIconSlot,
            'custom.toolset': toolsetSlot,
        });
    });

    it('applies the map option after selecting slots by prefix', () => {
        expect(mapSlots(slots, {
            prefix: 'action.',
            map: (name) => name.replace('action.', 'custom.'),
        })).toEqual({
            'custom.icon': actionIconSlot,
        });
    });

    it('uses the prefix instead of the filter when both are provided', () => {
        const filter = vi.fn(() => false);

        expect(mapSlots(slots, {
            prefix: 'action.',
            filter,
        })).toEqual({
            'icon': actionIconSlot,
        });

        expect(filter).not.toHaveBeenCalled();
    });

    it('preserves the original slot function references', () => {
        const result = mapSlots(slots, { prefix: 'action.' });

        expect(result.icon).toBe(actionIconSlot);
    });
});
