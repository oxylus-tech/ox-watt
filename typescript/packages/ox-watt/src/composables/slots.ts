import {
    defineComponent,
    h,
    resolveDynamicComponent,
    useAttrs,
    useSlots,
    type Component,
    type PropType,
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

/**
 * Creates a component that forwards attributes and selected slots
 * to a target component.
 *
 * @param component - Optional target component.
 * @param options - Slot mapping options.
 * @returns A wrapper component.
 */
export function mapSlots(
    component?: Component,
    options: MapSlotsOptions = {},
) {
    return defineComponent({
        inheritAttrs: false,

        props: {
            is: {
                type: [String, Object, Function] as PropType<Component | string>,
                required: !component,
            },
        },

        setup(props, { expose }) {
            const attrs = useAttrs();
            const slots = useSlots();

            expose();

            return () => {
                const target = component ?? resolveDynamicComponent(props.is!) as Component;
                const mappedSlots: Record<string, typeof slots[string]> = {};

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

                    mappedSlots[targetName] = slot;
                }

                return h(target, attrs, mappedSlots);
            };
        },
    });
}
