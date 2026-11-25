// tests/ui/components/toolsets/fixtures.ts

import { useAction } from '@/ui/composables/actions';

/**
 * Optional properties used to customize an action fixture.
 */
interface CreateActionOptions {
    /** Action helper text. */
    help?: string;

    /** Action icon. */
    icon?: string;

    /** Action destination URL. */
    href?: string;

    /** Determines whether the action is visible. */
    isVisible?: () => boolean;

    /** Determines whether the action is enabled. */
    isEnabled?: () => boolean;

    /** Action execution callback. */
    run?: () => Promise<unknown>;
}

/**
 * Creates a contextualized action instance for component tests.
 *
 * @param name - Action identifier.
 * @param title - Action title.
 * @param options - Optional action properties and behavior.
 * @returns The action instance.
 */
export function createAction(
    name = 'save',
    title = 'Save',
    options: CreateActionOptions = {},
) {
    return useAction(
        {
            name,
            title,
            help: options.help,
            icon: options.icon,
            href: options.href,
            isVisible: options.isVisible,
            isEnabled: options.isEnabled,
            run: options.run ?? (async () => undefined),
        },
        {},
    );
}

/**
 * Creates a toolset instance backed by a collection of child instances.
 *
 * @param name - Toolset identifier.
 * @param items - Child instances.
 * @param title - Optional toolset title.
 * @param icon - Optional toolset icon.
 * @returns A minimal toolset instance.
 */
export function createToolset(
    name: string,
    items: Array<{ definition: { name: string } }>,
    title = name,
    icon?: string,
) {
    const instances = new Map(items.map((item) => [item.definition.name, item]));

    return {
        definition: {
            name,
            title,
            icon,
            items: items.map((item) => ({ name: item.definition.name })),
        },
        get(path: string) {
            return instances.get(path);
        },
    };
}
