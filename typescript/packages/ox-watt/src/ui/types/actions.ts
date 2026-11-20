import type { ComputedRef, Ref } from "vue";
import type { KeyedStore, ReactiveKeyedStore } from "../../utils/store";

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
 * Stores action definitions indexed by their names.
 *
 * @template TContext - Context shared by the registered actions.
 */
export type ActionRegistry<TContext> =
    | KeyedStore<string, ActionDefinition<TContext, any, any>>
    | ReactiveKeyedStore<string, ActionDefinition<TContext, any, any>>;

/**
 * Options used to create an action registry.
 */
export interface CreateActionsRegistryOptions {
    /** Whether registry mutations should be reactive. */
    reactive?: boolean;
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


/**
 * Provides access to action definitions and contextualized action instances.
 *
 * @template TContext - Type of the context associated with the actions.
 */
export interface ActionRegistryContext<TContext> {
    /**
     * Source registry containing the action definitions.
     */
    registry: ActionRegistry<TContext>;

    /**
     * Reactive reference to the context associated with the registry.
     */
    context: ComputedRef<TContext>;

    /**
     * Retrieves a contextualized action instance by its name.
     *
     * @param name - Unique action identifier.
     * @returns The action instance, or undefined if it does not exist.
     */
    get(name: string): ActionInstance<TContext, any, any> | undefined;

    /**
     * Checks whether an action definition exists.
     *
     * @param name - Unique action identifier.
     * @returns Whether the definition exists.
     */
    has(name: string): boolean;

    /**
     * Executes an action by its name.
     *
     * @param name - Unique action identifier.
     * @param params - Optional action parameters.
     * @returns The execution result.
     */
    run(name: string, params?: unknown): Promise<unknown>;
}
