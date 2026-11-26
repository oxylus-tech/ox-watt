import { computed, toRef, unref, inject, provide } from "vue";
import type { Ref, InjectionKey } from "vue";

import { t } from "../../i18n"
import {
    createRegistry,
    useRegistry,
    type Registry,
    type UseRegistryOptions
} from "../../composables/registry"

import type {
    ActionInstance,
    AnyAction,
    ActionParam,
    ActionResult
} from "../types/actions";
import type {
    Toolset,
    ToolsetAction,
    ToolsetChild,
    ToolsetInstance,
    ToolsetInstanceChild
} from "../types/toolsets";
import { isAction, isActionInstance } from "../types/toolsets";

import { useAction, type UseActionOptions } from "./actions"


/**
 * Injection key for the root toolset instance.
 */
export const rootToolsetKey: InjectionKey<ToolsetInstance<any, any>> =
    Symbol("RootToolset");


export interface UseToolsetOptions<TContext> extends UseActionOptions<TContext>, UseRegistryOptions {
    /**
     * Whether to use reactive definitions registry.
     * You probably don't want it.
     */
    reactive?: boolean;

    /**
     * Whether to register this toolset with the current root toolset.
     *
     * @default false
     */
    register?: boolean;

}


/**
 * Just create an instance of the toolset based on the provided definition.
 *
 * @see useToolset
 */
export function createToolset<
    TContext,
    TToolset extends Toolset<TContext, any>=Toolset<TContext, any>,
    TAction extends ToolsetAction<TToolset> = ToolsetAction<TToolset>
>(
    definition: TToolset,
    context: TContext,
    options: UseToolsetOptions<TContext> = {},
): ToolsetInstance<TContext, TToolset> {

    function factory(
        item: ToolsetChild<TContext, TAction, TToolset>
    ): ToolsetInstanceChild<TContext, TToolset> {
        if(isAction<TContext, TAction, TToolset>(item))
            return useAction(item, context, options)
        return createToolset<TContext, TToolset>(item, context, {
            ...options,
            register: false
        })
    }

    const registry: Registry<ToolsetChild<TContext, TAction, TToolset>> = createRegistry({
        reactive: options.reactive,
        items: definition.items,
        keyField: 'name'
    })
    const { instances, get: getInstance, ...registryContext } = useRegistry(registry, factory, options)

    if(options.namespace) {
        const ns = `${options.namespace}.toolsets.${definition.name}`
        definition.title ??= t(`${ns}.title`)
        definition.description ??= t(`${ns}.description`)
    }

    const toolset = {
        ...registryContext,
        instances,
        definition,
        context,

        get(path: string): ToolsetInstanceChild<TContext, TToolset>|undefined {
            const [name, ...stems] = path.split(".")
            if(!name)
                return undefined

            let item = getInstance(name)
            for(const stem of stems) {
                if(!item)
                    return undefined

                if(isActionInstance(item))
                    throw new Error(`The item "${stem}" in "${path}" is an action (shall be a toolset)`)

                item = item.get(stem)
            }
            return item
        },

        run(path: string, params?: ActionParam<TAction>): Promise<ActionResult<TAction>> {
            const action = toolset.get(path);
            if(!action)
                throw new Error(`Action "${path}" not found.`)
            if(!isActionInstance(action))
                throw new Error(`The item "${path}" is not an action (but a toolset)`)
            return action.run(params)
        },
    }
    return toolset
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
export function useToolset<
    TContext,
    TToolset extends Toolset<TContext, any>=Toolset<TContext, any>,
    TAction extends ToolsetAction<TToolset> = ToolsetAction<TToolset>
>(
    definition: TToolset,
    context: TContext,
    options: UseToolsetOptions<TContext> = {},
): ToolsetInstance<TContext, TToolset> {
    const root = inject(rootToolsetKey, null)
    const toolset = createToolset<TContext, TToolset>(definition, context, options)

    if(options.register && root)
        root.register(definition.name, toolset)
    return toolset
}


/**
 * Creates a root toolset and provides its registration mechanism.
 *
 * @param definition - Root toolset definition.
 * @param context - Shared execution context.
 * @param options - Toolset options.
 * @returns The root toolset instance.
 */
export function useRootToolset<
    TContext,
    TToolset extends Toolset<TContext, any>=Toolset<TContext, any>,
    TAction extends ToolsetAction<TToolset> = ToolsetAction<TToolset>
>(
    definition: TToolset,
    context: TContext,
    options: UseToolsetOptions<TContext> = {},
): ToolsetInstance<TContext, TToolset> {
    const root = useToolset<TContext, TToolset>(definition, context, {
        ...options,
        register: false,
    });

    provide(rootToolsetKey, root);

    return root;
}
