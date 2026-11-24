import type { ComputedRef, Ref } from "vue";
import type { Registry, UseRegistry } from "@/composables/registry"
import type { ActionDefinition, ActionInstance } from "./actions"


/**
 * Defines a toolset independentlyof its execution context.
 *
 * @template TContext - Action execution context.
 */
export interface ToolsetDefinition<TContext> {
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
     * Children of the toolset (action and nested toolset).
     *
     * Note: the name of toolset and actions MUST be unique.
     */
    items?: ToolsetDefinitionChild<TContext, this>[];
}

/**
 * Stores toolset definitions indexed by their names.
 *
 * @template TContext - Context shared by the registered toolsets.
 */
export type ToolsetRegistry<TContext, TToolset extends ToolsetDefinition<TContext> = ToolsetDefinition<TContext>> = Registry<ToolsetDefinitionChild<TContext, TToolset>>;

/**
 * A child of a toolset definition.
 */
export type ToolsetDefinitionChild<TContext, TToolset extends ToolsetDefinition<TContext> = ToolsetDefinition<TContext>> =
    | ActionDefinition<TContext, any, any>
    | TToolset;

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
export interface ToolsetInstance<TContext, TToolset extends ToolsetDefinition<TContext>=ToolsetDefinition<TContext>>
    extends UseRegistry<
        ToolsetDefinitionChild<TContext>,
        ToolsetInstanceChild<TContext>
    >
{
    /** Original toolset definition. */
    definition: TToolset<TContext>;

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
export type ToolsetInstanceChild<TContext, TToolset extends ToolsetDefinition<TContext>=ToolsetDefinition<TContext>> =
    | ActionInstance<TContext, any, any>
    | ToolsetInstance<TContext, TToolset>;

/**
 * Checks whether a value is an action definition.
 *
 * @template TContext Type of the action execution context.
 * @param value Value to check.
 * @returns Whether the value is an action definition.
 */
export function isActionDefinition<TContext>(
    value: ActionDefinition<TContext, any, any> | ToolsetDefinition<TContext>,
): value is ActionDefinition<TContext, any, any> {
    return (
        ("run" in value && typeof value.run === "function") ||
        ("href" in value && typeof value.href === "string") ||
        ("handler" in value && typeof value.handler === "string")
    )
}



/**
 * Checks whether a value is an action definition.
 *
 * @template TContext Type of the action execution context.
 * @param value Value to check.
 * @returns Whether the value is an action definition.
 */
export function isActionInstance<TContext>(
    value: ActionInstance<TContext, any, any> | ToolsetInstance<TContext>,
): value is ActionInstance<TContext, any, any> {
    return isActionDefinition(value.definition)
}
