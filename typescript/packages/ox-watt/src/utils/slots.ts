import {
    defineComponent,
    h,
    resolveDynamicComponent,
    useAttrs,
    useSlots,
    type Component,
    type PropType,
    type Slot
} from 'vue';


interface MapSlotsOptions {
    /**
     * Selects slots whose names start with this prefix.
     */
    prefix?: string;

    /**
     * Selects slots to forward.
     */
    filter?: (name: string) => boolean;

    /**
     * Maps source slot names to target slot names.
     */
    map?: (name: string) => string;
}

export type Slots = Record<string, Slot>;

/**
 * Maps a collection of Vue slots.
 *
 * @param slots - Source slots.
 * @param options - Slot mapping options.
 * @returns The mapped slots.
 */
export function mapSlots(
    slots: Slots,
    options: MapSlotsOptions = {},
): Slots {
    const result: Slots = {};

    for (const [name, slot] of Object.entries(slots)) {
        const selected = options.prefix
            ? name.startsWith(options.prefix)
            : options.filter
                ? options.filter(name)
                : true;

        if (!selected) {
            continue;
        }

        const targetName = options.map
            ? options.map(name)
            : options.prefix
                ? name.slice(options.prefix.length)
                : name;

        result[targetName] = slot;
    }

    return result;
}
