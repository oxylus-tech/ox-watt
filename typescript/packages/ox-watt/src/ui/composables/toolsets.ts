import { computed, toRef, unref } from "vue";
import type { Ref, MaybeRef } from "vue";

import {
    createRegistry,
    useRegistry,
    type Registry,
    type UseRegistryOptions
} from "@/composables/registry"

import type { ActionInstance, } from "../types/actions";
import type {
    ToolsetDefinition,
    ToolsetDefinitionChild,
    ToolsetInstance,
    ToolsetInstanceChild
} from "../types/toolsets";
import { isActionDefinition, isActionInstance } from "../types/toolsets";

import { useAction, type UseActionOptions } from "./actions"


export interface UseToolsetOptions extends UseActionOptions, UseRegistryOptions {
    /**
     * Whether to use reactive definitions registry.
     * You probably don't want it.
     */
    reactive?: boolean;
}

/**
 * Creates a contextualized toolset.
 *
 * The toolset resolves its action references through the provided registry.
 * Action instances are owned and cached by the action registry composable.
 *
 * @template TContext - Context shared by the referenced actions.
 *
 * @param definition - Toolset definition.
 * @param registry - Contextualized action registry.
 *
 * @returns A toolset instance.
 */
export function useToolset<TContext>(
    definition: ToolsetDefinition<TContext>,
    context: MaybeRef<TContext>,
    options: UseToolsetOptions,
): ToolsetInstance<TContext> {
    const contextRef = toRef(context) as Ref<TContext>;

    function factory(item: ToolsetDefinitionChild<TContext>) {
        if(isActionDefinition(item))
            return useAction(item, contextRef, options)
        return useToolset(item, contextRef, options)
    }

    const registry: Registry<ToolsetDefinitionChild<TContext>> = createRegistry({
        reactive: options.reactive,
        items: definition.items,
        keyField: 'name'
    })
    const { instances, get: getInstance, ...registryContext } = useRegistry(registry, factory, options)

    const toolsetInstance = {
        ...registryContext,
        instances,
        definition,
        context: contextRef,

        get(path: string): ToolsetInstanceChild<TContext>|undefined {
            const [name, ...stems] = path.split(".")
            if(!name)
                return undefined

            let item = getInstance(name) as ToolsetInstanceChild<TContext> | undefined
            for(const stem of stems) {
                if(!item)
                    return undefined

                if(isActionInstance(item))
                    throw new Error(`The item "${stem}" in "${path}" is an action (shall be a toolset)`)

                item = item.get(stem)
            }
            return item
        },

        run(path: string, params?: unknown): Promise<unknown> {
            const action = toolsetInstance.get(path);
            if(!action)
                throw new Error(`Action "${path}" not found.`)
            if(!isActionInstance(action))
                throw new Error(`The item "${path}" is not an action (but a toolset)`)
            return action.run(params)
        },
    }
    return toolsetInstance
}
