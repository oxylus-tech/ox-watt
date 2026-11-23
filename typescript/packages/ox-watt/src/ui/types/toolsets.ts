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
    items: ToolsetDefinitionChild<TContext>[];
}

/**
 * Stores toolset definitions indexed by their names.
 *
 * @template TContext - Context shared by the registered toolsets.
 */
export type ToolsetRegistry<TContext> = Registry<ToolsetDefinitionChild<TContext>>;

/**
 * A child of a toolset definition.
 */
export type ToolsetDefinitionChild<TContext> =
    | ActionDefinition<TContext, any, any>
    | ToolsetDefinition<TContext>;

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
export interface ToolsetInstance<TContext>
    extends UseRegistry<
        ToolsetDefinitionChild<TContext>,
        ToolsetInstanceChild<TContext>
    >
{
    /** Original toolset definition. */
    definition: ToolsetDefinition<TContext>;

    /** Whether the toolset is visible. */
    visible: ComputedRef<boolean>;

    /** Whether the toolset is active. */
    active: ComputedRef<boolean>;

    /** Whether the toolset is currently running. */
    running: ComputedRef<boolean>;

    /**
     * Reactive reference to the associated context.
     */
    context: Ref<TContext>;

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
export type ToolsetInstanceChild<TContext> =
    | ActionInstance<TContext, any, any>
    | ToolsetInstance<TContext>;

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
    return "run" in value && typeof value.run === "function";
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
