import { KeyedStore, ReactiveKeyedStore } from "@/utils/store";
import type { ActionDefinition, ActionRegistry, CreateActionsRegistryOptions, } from "./types/actions";
export * from "./types/actions";


/**
 * Creates a non-reactive action registry.
 *
 * @template TContext - Context shared by the registered actions.
 *
 * @returns An action registry.
 */
export function createActionsRegistry<TContext>(
    options?: { reactive?: false }
): KeyedStore<string, ActionDefinition<TContext, any, any>>;

/**
 * Creates a reactive action registry.
 *
 * @template TContext - Context shared by the registered actions.
 *
 * @param options - Registry creation options.
 *
 * @returns A reactive action registry.
 */
export function createActionsRegistry<TContext>(
    options: { reactive: true }
): ReactiveKeyedStore<string, ActionDefinition<TContext, any, any>>;

/**
 * Creates an action registry.
 *
 * @template TContext - Context shared by the registered actions.
 *
 * @param options - Registry creation options.
 *
 * @returns An action registry.
 */
export function createActionsRegistry<TContext>(
    options: CreateActionsRegistryOptions = {}
): ActionRegistry<TContext> {
    if (options.reactive) {
        return new ReactiveKeyedStore<
            string,
            ActionDefinition<TContext, any, any>
        >(undefined, "name");
    }

    return new KeyedStore<
        string,
        ActionDefinition<TContext, any, any>
    >(undefined, "name");
}
