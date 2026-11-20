import { computed } from "vue";

import type {
    ActionInstance,
    ActionRegistryContext,
    ToolsetDefinition,
    ToolsetInstance,
} from "../types/toolsets";

/**
 * Creates a contextualized toolset.
 *
 * The toolset resolves its action references through the provided registry.
 * Action instances are owned and cached by the action registry composable.
 *
 * @template TContext - Context shared by the referenced actions.
 *
 * @param definition - Toolset definition.
 * @param registry - Contextualized action registry.
 *
 * @returns A toolset instance.
 */
export function useToolset<TContext>(
    definition: ToolsetDefinition<TContext>,
    registry: ActionRegistryContext<TContext>
): ToolsetInstance<TContext> {
    const actions = computed(() =>
        definition.actions
            .map(name => registry.get(name))
            .filter(
                (action): action is ActionInstance<TContext, any, any> =>
                    action !== undefined
            )
    );

    return { definition, actions, };
}
