import type { ComputedRef, Ref } from "vue";
import type { Registry, UseRegistry } from "../../composables/registry"
import type { NamedDefinitionBase } from "../../utils/types"


export interface BaseAction<TContext>
    extends NamedDefinitionBase
{
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
export interface CommandAction<TContext, TParams = void, TResult = unknown>
    extends BaseAction<TContext>
{
    /** Executes the action. */
    run: (context: TContext, params: TParams) => TResult | Promise<TResult>;
    href?: never;
}

/**
 * Define an action going to the provided link.
 */
export interface LinkAction<TContext>
    extends BaseAction<TContext>
{
    /** Url to the next page. */
    href: string;
    run?: never;
}

/**
 * Define an action running an {@link ActionHandler}.
 */
export interface HandledAction<TContext>
    extends BaseAction<TContext>
{
    /** Action handler name. **/
    handler: string;
    run?: never;
    href?: never;
}

/**
 * Define an action to execute.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export type Action<TContext, TParams=void, TResult = unknown> =
    | CommandAction<TContext, TParams, TResult>
    | LinkAction<TContext>
    | HandledAction<TContext>;


export type AnyAction<TContext> = Action<TContext, any, any>;


/**
 * Extracts the parameters type from an action definition.
 *
 * @template TAction - Action definition type.
 */
export type ActionParam<TAction> =
    TAction extends {
        run: (context: any, params: infer TParams) => any;
    }
        ? TParams
        : void;

/**
 * Extracts the resolved result type from an action definition.
 *
 * @template TAction - Action definition type.
 */
export type ActionResult<TAction> =
    TAction extends {
        run: (...args: any[]) => infer TResult;
    }
        ? Awaited<TResult>
        : void;


/**
 * An action handler allows to handle multiple actions with the same run function.
 *
 * It avoid repeated code.
 */
export interface ActionHandler<
    TContext=any,
    TParams=void,
    TResult=unknown,
    TDefinition extends Action<TContext, TParams, TResult>=Action<TContext, TParams, TResult>
> {
    run: (context: TContext, definition: TDefinition, params?: TParams) => Promise<TResult> | TResult;
}

/**
 * A map of action handlers.
 */
export type ActionHandlers<TContext> = Map<string, ActionHandler<any, any, any>>;

/**
 * Represents an action definition bound to an execution context.
 *
 * @template TContext - Action execution context.
 * @template TParams - Parameters accepted by the action.
 * @template TResult - Result returned by the action.
 */
export interface ActionInstance<
    TContext,
    TAction extends AnyAction<TContext> = AnyAction<TContext>
> {
    /** Original action definition. */
    definition: TAction;

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
    run?: (params?: ActionParam<TAction>) => Promise<ActionResult<TAction>>;

    /** Url to load **/
    href?: string;
}
