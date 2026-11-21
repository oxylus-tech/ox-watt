import { computed, provide, inject, ref, unref } from "vue";
import type { ComputedRef, MaybeRef, InjectionKey } from "vue";

import type {
    ActionDefinition,
    ActionInstance,
    ActionRegistry,
    ActionRegistryContext,
} from "../types/actions";


/**
 * Injection key used to provide an action registry context.
 */
const actionRegistryKey: InjectionKey<ActionRegistryContext<any>> =
    Symbol("ow-action-registry");


/**
 * Options for the action registry composable.
 */
export interface UseActionRegistryOptions {
    /**
     * Provides the action registry context to descendant components.
     *
     * @default false
     */
    provide?: boolean;

    /** Whether the same action instance can run concurrently.
     *
     * @default false
     */
    concurrent?: boolean;
}

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
}


/**
 * Options for resolving a registered action.
 */
export interface UseNamedActionOptions {
    /**
     * Explicit action registry context.
     * When omitted, the nearest provided context is used.
     */
    registry?: ActionRegistryContext<any>;

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
 * Provides contextualized and reactive action instances.
 *
 * Instances are cached by action name and recreated when their definition
 * is replaced in the registry.
 *
 * @template TContext - Context shared by the registered actions.
 *
 * @param registry - Action definition registry.
 * @param context - Reactive or non-reactive execution context.
 * @param options - Execution options.
 *
 * @returns A contextualized action registry.
 */
export function useActionRegistry<TContext>(
    registry: ActionRegistry<TContext>,
    context: MaybeRef<TContext>,
    options: UseActionRegistryOptions = {}
): ActionRegistryContext<TContext> {
    const { concurrent = false } = options;

    const instances = new Map<
        string,
        {
            definition: ActionDefinition<TContext, any, any>;
            instance: ActionInstance<TContext, any, any>;
        }
    >();
    const contextRef = computed(() => unref(context));

    /**
     * Returns an action instance, creating it when necessary.
     *
     * @param name - Action name.
     *
     * @returns The cached action instance or undefined.
     */
    function get(name: string): ActionInstance<TContext, any, any> | undefined {
        const definition = registry.getRaw(name);

        if (!definition) {
            instances.delete(name);
            return undefined;
        }

        const cached = instances.get(name);
        if (cached?.definition === definition)
            return cached.instance;

        const instance = useAction(definition, context, {concurrent});
        instances.set(name, { definition, instance });
        return instance;
    }

    /**
     * Checks whether an action definition exists.
     *
     * @param name - Action name.
     *
     * @returns Whether the action exists.
     */
    function has(name: string): boolean {
        return registry.has(name);
    }

    /**
     * Runs an action by name.
     *
     * @param name - Action name.
     * @param params - Optional action parameters.
     *
     * @returns The action execution result.
     *
     * @throws Error when the action does not exist.
     */
    async function run(name: string, params?: unknown): Promise<unknown> {
        const action = get(name);

        if (!action) {
            throw new Error(`Action "${name}" not found.`);
        }

        return action.run(params);
    }

    const actionRegistryContext: ActionRegistryContext<TContext> = {
        registry,
        context: contextRef,
        get,
        has,
        run,
    };

    if (options.provide)
        provide(actionRegistryKey, actionRegistryContext);

    return actionRegistryContext;
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
    name: string,
    options: UseNamedActionOptions = {},
): ComputedRef<ActionInstance<TContext, TParams, TResult> | undefined> {
    const injectedRegistry = inject(actionRegistryKey, undefined);
    const registry = options.registry ?? injectedRegistry;

    if (!registry && options.required) {
        throw new Error("No action registry context has been provided.");
    }

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
