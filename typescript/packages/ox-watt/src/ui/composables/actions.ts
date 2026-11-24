import { computed, provide, inject, ref, toRef } from "vue";
import type { ComputedRef, Ref } from "vue";

import type { ActionDefinition, ActionInstance, ActionHandler } from "../types/actions";
import type { ToolsetInstance } from "../types/toolsets"

import { useRegistry, type UseRegistryOptions } from "@/composables/registry"


/**
 * This own action handlers that can be used by actions instances.
 *
 * By default we provide:
 *
 * - `link`: used to change the page when a definition has a `href` attribute.
 *   You can replace it whenever you want to change the behavior. However, it
 *   won't be sure that the action will be executed: the component may implement
 *   its own behaviors (as `v-btn.href` property).
 *
 */
export const actionHandlers = new Map<string, ActionHandler<any,any,any>>([
    [
        "href",
        {
            run(context: any, definition: ActionDefinition<any,any,any>) {
                if(!definition.href)
                    return
                window.location.href = definition.href
            }
        }
    ]
])


/**
 * Options for useAction.
 */
export interface UseActionOptions {
    /**
     * Throws an error if the action is unavailable.
     *
     * @default false
     */
    required?: boolean;

    /** Whether the same action instance can run concurrently.
     *
     * @default false
     */
    concurrent?: boolean;
}


/**
 * Options for resolving a registered action.
 */
export interface UseNamedActionOptions {
    /**
     * Throws an error if the registry or action is unavailable.
     *
     * @default false
     */
    required?: boolean;
}



/**
 * Creates a reactive action instance bound to an execution context.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 *
 * @param definition - Action definition.
 * @param context - Reactive or non-reactive execution context.
 * @param concurrent - Whether concurrent executions are allowed.
 *
 * @returns A contextualized action instance.
 */
export function useAction<TContext, TParams = void, TResult = unknown>(
    definition: ActionDefinition<TContext, TParams, TResult>,
    context: TContext,
    options: UseActionOptions = {},
): ActionInstance<TContext, TParams, TResult> {
    const running = ref(false);
    const {concurrent=false} = options
    let executionCount = 0;

    return {
        definition,

        visible: computed(() =>
            definition.isVisible?.(context) ?? true
        ),

        enabled: computed(() =>
            (definition.isEnabled?.(context) ?? true) &&
            (concurrent || !running.value)
        ),

        active: computed(() =>
            definition.isActive?.(context) ?? false
        ),

        running,

        async run(params?: TParams): Promise<TResult> {
            if (!concurrent && running.value) {
                throw new Error(`Action "${definition.name}" is already running.`);
            }

            executionCount++;
            running.value = true;

            try {
                if(definition.run)
                    return await definition.run(context, params as TParams);

                const handlerKey = definition.handler ?? (definition.href ? "link" : undefined)
                if(!handlerKey)
                    throw new Error(`No handler provided on action ${definition.name}.`)

                const handler = actionHandlers.get(handlerKey)
                return await handler.run(context, definition, params)
            } finally {
                executionCount--;
                running.value = executionCount > 0;
            }
        },
    };
}


/**
 * Retrieves a contextualized action instance from an action registry.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 *
 * @param name - Unique action identifier.
 * @param options - Named action lookup options.
 *
 * @returns A computed reference to the action instance.
 */
export function useNamedAction<
    TContext = unknown,
    TParams = void,
    TResult = unknown,
>(
    registry: ToolsetInstance<TContext>,
    name: string,
    options: UseNamedActionOptions = {},
): ComputedRef<ActionInstance<TContext, TParams, TResult> | undefined> {
    const action = computed(() =>
        registry?.get(name) as
            | ActionInstance<TContext, TParams, TResult>
            | undefined,
    );

    if (options.required && !action.value) {
        throw new Error(`Action "${name}" not found.`);
    }

    return action;
}
