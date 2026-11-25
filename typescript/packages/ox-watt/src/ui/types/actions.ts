import type { ComputedRef, Ref } from "vue";
import type { Registry, UseRegistry } from "@/composables/registry"


export interface BaseActionDefinition<TContext> {
    /** Unique action name within its registry. */
    name: string;

    /** Optional display title of the action. */
    title?: string;

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

export interface HandledActionDefinition<TContext>
    extends BaseActionDefinition<TContext>
{
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
export type ActionDefinition<TContext, TParams=void, TResult = unknown> =
    | CommandActionDefinition<TContext, TParams, TResult>
    | LinkActionDefinition<TContext>
    | HandledActionDefinition<TContext>;


export type AnyActionDefinition<TContext> = ActionDefinition<TContext, any, any>;


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
export interface ActionInstance<
    TContext,
    TAction extends AnyActionDefinition<TContext> = AnyActionDefinition<TContext>
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



/**
 * Properties of the {@link OwAction} component.
 */
export interface OwActionProps {
    /**
     * Existing action instance.
     *
     * Takes precedence over the action resolved through the registry.
     */
    action: ActionInstance<any, any>;

    /**
     * Overrides the action definition label.
     */
    title?: string;

    /**
     * Overrides the action definition help text.
     */
    help?: string;

    /**
     * Hide help.
     */
    noHelp?: boolean;
}
