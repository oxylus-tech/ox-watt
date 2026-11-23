import { computed, provide, inject, ref, unref, toRef } from "vue";
import type { ComputedRef, MaybeRef, Ref } from "vue";

import type { ActionDefinition, ActionInstance } from "../types/actions";
import type { ToolsetInstance } from "../types/toolsets"

import { useRegistry, type UseRegistryOptions } from "@/composables/registry"


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
    context: MaybeRef<TContext>,
    options: UseActionOptions = {},
): ActionInstance<TContext, TParams, TResult> {
    const running = ref(false);
    const {concurrent=false} = options
    let executionCount = 0;

    return {
        definition,

        visible: computed(() =>
            definition.isVisible?.(unref(context)) ?? true
        ),

        enabled: computed(() =>
            (definition.isEnabled?.(unref(context)) ?? true) &&
            (concurrent || !running.value)
        ),

        active: computed(() =>
            definition.isActive?.(unref(context)) ?? false
        ),

        running,

        async run(params?: TParams): Promise<TResult> {
            if (!concurrent && running.value) {
                throw new Error(`Action "${definition.name}" is already running.`);
            }

            executionCount++;
            running.value = true;

            try {
                return await definition.run(unref(context), params as TParams);
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
