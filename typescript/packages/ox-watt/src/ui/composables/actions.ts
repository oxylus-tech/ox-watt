import { computed, provide, inject, ref, toRef } from "vue";
import type { ComputedRef, Ref } from "vue";

import { t } from "../../i18n"
import { useRegistry, type UseRegistryOptions } from "../../composables/registry"

import type {
    Action,
    AnyAction,
    ActionInstance,
    ActionHandler,
    ActionHandlers,
    ActionParam,
    ActionResult
} from "../types/actions";
import type { ToolsetInstance } from "../types/toolsets"


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
export const actionHandlers: ActionHandlers<any> = new Map<string, ActionHandler<any,any,any>>([
    [
        "href",
        {
            run(context: any, definition: Action<any,any,any>) {
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
export interface UseActionOptions<TContext> {
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

    /**
     * Use this action handler instead of default {@link actionHandlers}.
     */
    handlers?: ActionHandlers<TContext>
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


export interface CreateActionOptions {
    i18nPrefix: string
}

/**
 * Create an action definition using provided input and options.
 *
 * It will ensure title and description are set.
 */
export function createAction<
    TContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>: (
    action: TAction,
    options: CreateActionOptions
): TAction {
    const i18nPrefix = options.i18nPrefix
    const extra = {}
    if(i18nPrefix) {
        extra.title = action.
        title: action.title ?? t(`${i18nPrefix}.${action.name}.title`),
        description: action.description ?? t(`${i18nPrefix}.${action.name}.description`),
    }

    return {
        ...action,
        ...extra
    }
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
 * @param options - Options.
 *
 * @returns A contextualized action instance.
 */
export function useAction<
    TContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>(
    definition: TAction,
    context: TContext,
    options: UseActionOptions<TContext> = {},
): ActionInstance<TContext, TAction> {
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
            (definition.isActive?.(context) ?? false) || running.value
        ),

        running,

        async run(params?: ActionParam<TAction>): Promise<ActionResult<TAction>> {
            if (!concurrent && running.value) {
                throw new Error(`Action "${definition.name}" is already running.`);
            }

            executionCount++;
            running.value = true;

            try {
                if(definition.run)
                    return await definition.run(context, params as ActionParam<TAction>);

                const handlerKey = ("handler" in definition && definition.handler) ?? (definition.href ? "link" : undefined)
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
    TAction extends AnyAction<TContext> = AnyAction<TContext>
>(
    registry: ToolsetInstance<TContext>,
    name: string,
    options: UseNamedActionOptions = {},
): ComputedRef<ActionInstance<TContext, TAction> | undefined> {
    const action = computed(() =>
        registry?.get(name) as
            | ActionInstance<TContext, TAction>
            | undefined,
    );

    if (options.required && !action.value) {
        throw new Error(`Action "${name}" not found.`);
    }

    return action;
}
