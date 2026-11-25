import type { ComputedRef, Ref, Component } from "vue";

import type { Registry, UseRegistry } from "@/composables/registry"
import type { AnyActionDefinition, ActionInstance } from "./actions"


/**
 * Defines a toolset independentlyof its execution context.
 *
 * @template TContext - Action execution context.
 */
export interface ToolsetDefinition<
    TContext,
    TAction extends AnyActionDefinition<TContext> = AnyActionDefinition<TContext>
> {
    /**
     * Unique toolset identifier.
     */
    name: string;

    /**
     * Human-readable toolset title.
     */
    title?: string;

    /**
     * Additional information about the toolset.
     */
    help?: string;

    /**
     * Icon of the toolset.
     */
    icon?: string;

    /**
     * Children of the toolset (action and nested toolset).
     *
     * Note: the name of toolset and actions MUST be unique.
     */
    items?: ToolsetDefinitionChild<TContext, TAction, this>[];
}



/**
 * Extracts the action definition type from a toolset definition.
 *
 * @template TToolset - Toolset definition type.
 */
export type ToolsetAction<
    TToolset extends ToolsetDefinition<any, any>
> = TToolset extends ToolsetDefinition<any, infer TAction>
    ? TAction
    : never;

/**
 * Stores toolset definitions indexed by their names.
 *
 * @template TContext - Context shared by the registered toolsets.
 */
export type ToolsetRegistry<
    TContext,
    TAction extends AnyActionDefinition<TContext> = AnyActionDefinition<TContext>,
    TToolset extends ToolsetDefinition<TContext, TAction> = ToolsetDefinition<TContext, TAction>
> = Registry<ToolsetDefinitionChild<TContext, TAction, TToolset>>;

/**
 * A child of a toolset definition.
 */
export type ToolsetDefinitionChild<
    TContext,
    TAction extends AnyActionDefinition<TContext> = AnyActionDefinition<TContext>,
    TToolset extends ToolsetDefinition<TContext, TAction> = ToolsetDefinition<TContext, TAction>
> = TAction | TToolset;

/**
 * Options used to create an toolset registry.
 */
export interface CreateToolsetsRegistryOptions {
    /** Whether registry mutations should be reactive. */
    reactive?: boolean;
}

/**
 * Represents an toolset definition bound to an execution context.
 *
 * @template TContext - Toolset execution context.
 * @template TParams - Parameters accepted by the toolset.
 * @template TResult - Result returned by the toolset.
 */
export interface ToolsetInstance<
    TContext,
    TToolset extends ToolsetDefinition<TContext, any>=ToolsetDefinition<TContext, any>
>
    extends UseRegistry<
        ToolsetDefinitionChild<TContext, ToolsetAction<TToolset>, TToolset>,
        ToolsetInstanceChild<TContext, TToolset>
    >
{
    /** Original toolset definition. */
    definition: TToolset;

    /**
     * Reactive reference to the associated context.
     */
    context: TContext;

    /**
     * Executes an action by its name.
     *
     * @param name - Unique action identifier.
     * @param params - Optional action parameters.
     * @returns The execution result.
     */
    run(path: string, params?: unknown): Promise<unknown>;
}


/**
 * A child of a toolset definition.
 */
export type ToolsetInstanceChild<
    TContext,
    TToolset extends ToolsetDefinition<TContext, any>=ToolsetDefinition<TContext, any>
> = | ActionInstance<TContext, ToolsetAction<TToolset>>
    | ToolsetInstance<TContext, TToolset>;

/**
 * Checks whether a value is an action definition.
 *
 * @template TContext Type of the action execution context.
 * @param value Value to check.
 * @returns Whether the value is an action definition.
 */
export function isActionDefinition<
    TContext,
    TAction extends AnyActionDefinition<TContext>,
    TToolset extends ToolsetDefinition<TContext, TAction>
>(
    value: TAction | TToolset,
): value is TAction {
    return (
        ("run" in value && typeof value.run === "function") ||
        ("href" in value && typeof value.href === "string") ||
        ("handler" in value && typeof value.handler === "string")
    );
}

/**
 * Checks whether a value is an action instance.
 *
 * @template TContext Type of the action execution context.
 * @param value Value to check.
 * @returns Whether the value is an action instance.
 */
export function isActionInstance<
    TContext,
    TToolset extends ToolsetDefinition<TContext, any> = ToolsetDefinition<TContext, any>
>(
    value: ActionInstance<TContext, ToolsetAction<TToolset>> | ToolsetInstance<TContext, TToolset>,
): value is ActionInstance<TContext, ToolsetAction<TToolset>> {
    return isActionDefinition<TContext, ToolsetAction<TToolset>, TToolset>(value.definition);
}


/**
 * Properties of the {@link OwToolset} component.
 */
export interface OwToolsetProps {
    /**
     * Toolset to display
     */
    toolset: ToolsetInstance<any>;

    /**
     * Display toolset title.
     *
     * This is not a warranty that title will be displayed, rather a request
     * by the user. Component may display or not the title regardless this
     * property.
     */
    showTitle?: boolean;
}

/**
 * Properties of the {@link OwToolsetList} component.
 */
export interface OwToolsetListProps extends OwToolsetProps {
}

export interface OwToolsetMenuProps extends OwToolsetProps {
    /**
     * Whether this toolset menu is nested under another one.
     */
    nested?: boolean
}
