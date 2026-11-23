import type { ComputedRef, Ref } from "vue";
import type { Registry, UseRegistry } from "@/composables/registry"


export interface BaseActionDefinition<TContext> {
    /** Unique action name within its registry. */
    name: string;

    /** Optional display label. */
    label?: string;

    /** Optional help text. */
    help?: string;

    /** Optional icon identifier. */
    icon?: string;

    /** Optional action handler. */
    handler?: string;

    /** Determines whether the action is visible. */
    isVisible?: (context: TContext) => boolean;

    /** Determines whether the action is enabled. */
    isEnabled?: (context: TContext) => boolean;

    /** Determines whether the action is active. */
    isActive?: (context: TContext) => boolean;

}

/**
 * Defines an action executing provided run function.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export interface CommandActionDefinition<TContext, TParams = void, TResult = unknown>
    extends BaseActionDefinition<TContext>
{
    /** Executes the action. */
    run: (context: TContext, params: TParams) => TResult | Promise<TResult>;
    href?: never;
}

/**
 * Define an action going to the provided link.
 */
export interface LinkActionDefinition<TContext>
    extends BaseActionDefinition<TContext>
{
    /** Executes the action. */
    href: string;
    run?: never;
}

/**
 * Define an action to execute.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export type ActionDefinition<TContext, TParams=void, TResult = unknown> =
    | CommandActionDefinition<TContext, TParams, TResult>
    | LinkActionDefinition<TContext>;


/**
 * An action handler allows to handle multiple actions with the same run function.
 *
 * It avoid repeated code.
 */
export interface ActionHandler<
    TContext=any,
    TParams=void,
    TResult=unknown,
    TDefinition extends ActionDefinition<TContext, TParams, TResult>=ActionDefinition<TContext, TParams, TResult>
> {
    run: (context: TContext, definition: TDefinition, params?: TParams) => Promise<TResult> | TResult;
}

/**
 * Represents an action definition bound to an execution context.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export interface ActionInstance<TContext, TParams = void, TResult = unknown> {
    /** Original action definition. */
    definition: ActionDefinition<TContext, TParams, TResult>;

    /** Whether the action is visible. */
    visible: ComputedRef<boolean>;

    /**
     * Whether the action is enabled.
     *
     * Note: when there is not concurrency allowed, this value is false
     * on running.
     */
    enabled: ComputedRef<boolean>;

    /** Whether the action is active. */
    active: ComputedRef<boolean>;

    /** Whether the action is currently running. */
    running: Ref<boolean>;

    /** Runs the action. */
    run?: (params?: TParams) => Promise<TResult>;

    /** Url to load **/
    href?: string;
}
