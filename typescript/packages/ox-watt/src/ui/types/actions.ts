import type { ComputedRef, Ref } from "vue";
import type { Registry, UseRegistry } from "@/composables/registry"

/**
 * Defines an action independently of its execution context.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export interface ActionDefinition<TContext, TParams = void, TResult = unknown> {
    /** Unique action name within its registry. */
    name: string;

    /** Optional display label. */
    label?: string;

    /** Optional help text. */
    help?: string;

    /** Optional icon identifier. */
    icon?: string;

    /** Determines whether the action is visible. */
    isVisible?: (context: TContext) => boolean;

    /** Determines whether the action is enabled. */
    isEnabled?: (context: TContext) => boolean;

    /** Determines whether the action is active. */
    isActive?: (context: TContext) => boolean;

    /** Executes the action. */
    run: (context: TContext, params: TParams) => TResult | Promise<TResult>;
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
    run: (params?: TParams) => Promise<TResult>;
}
