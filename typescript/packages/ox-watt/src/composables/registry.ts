import { provide, shallowReactive, type ShallowReactive } from "vue"
import { KeyedStore, ReactiveKeyedStore } from "../utils/store"
import { useRegistration } from "./useRegistration"


/**
 * A registry is a keyed store (optionally reactive), keeping
 * definitions of objects to instanciate.
 */
export type Registry<TItem> = KeyedStore<string, TItem> | ReactiveKeyedStore<string, TItem>


/**
 * Options to create a registry.
 */
export interface CreateRegistryOptions<TItem, TReactive extends boolean=boolean> {
    /** Create a reactive registry */
    reactive?: TReactive,
    /** Items to use for initialization. */
    items?: Map<string, TItem> | Iterable<TItem>,
    /** Override default keyField "name". **/
    keyField?: string,
}

/**
 * Options to `useRegistry`.
 */
export interface UseRegistryOptions {
    /**
     * Provide the registry using this key.
     *
     * It allows to inject it in children vue scopes.
     */
    provideKey?: string | unknown
}


/**
 * Provides access to action definitions and contextualized action instances.
 *
 * @template TContext - Type of the context associated with the actions.
 */
export interface UseRegistry<TItem, TInstance> {
    /**
     * Source registry containing the action definitions.
     */
    registry: Registry<TItem>;

    /**
     * Created instances.
     */
    instances: ShallowReactive<Map<string, TInstance>>;

    /**
     * Retrieves an instance by its name, creating it if missing.
     *
     * @param name - Unique action identifier.
     * @returns The instance, or undefined if no definition exists.
     */
    get(name: string): TInstance | undefined;

    /**
     * Checks whether an item definition exists.
     *
     * @param name - Unique item identifier.
     * @returns Whether the definition exists.
     */
    has(name: string): boolean;

    /**
     * Registers an instance in the registry.
     *
     * @param key - Unique instance identifier.
     * @param instance - Instance to register.
     * @param autoDispose - Whether to unregister when the current scope is disposed.
     * @throws Error if an item with the same name is already registered.
     * @returns The unregister callback.
     */
    register(key: string, instance: TInstance, autoDispose?: boolean): () => void;

    /**
     * Unregister an item and its instance.
     *
     * @param name - Name of the item to remove.
     */
    unregister(name: string): void;
}

/**
 * Create a non-reactive keyed store.
 * @returns The keyed store.
 */
export function createRegistry<TItem> (
    options: CreateRegistryOptions<TItem, false>
): KeyedStore<string, TItem>

/**
 * Create a reactive keyed store.
 * @returns The reactive keyed store.
 */
export function createRegistry<TItem> (
   options: CreateRegistryOptions<TItem, true>
): ReactiveKeyedStore<string, TItem>

export function createRegistry<TItem> (
   options: CreateRegistryOptions<TItem, false | true>
): ReactiveKeyedStore<string, TItem>

/**
 * Create a reactive or non reactive registry.
 */
export function createRegistry<TItem>(
    options: CreateRegistryOptions<TItem, boolean>
): Registry<TItem> {
    if(options.reactive)
        return new ReactiveKeyedStore<string, TItem>(options.items, options.keyField ?? "name")
    return new KeyedStore<string, TItem>(options.items, options.keyField ?? "name")
}


export function useRegistry<TItem, TInstance>(
    registry: Registry<TItem>,
    factory: (item: TItem) => TInstance,
    options?: UseRegistryOptions,
): UseRegistry<TItem, TInstance> {
    const instances = shallowReactive(new Map<string, TInstance>());

    const registryContext: UseRegistry<TItem, TInstance> = {
        registry,
        instances,

        get(name: string): TInstance | undefined {
            const definition = registry.getRaw(name);
            if (!definition) {
                instances.delete(name);
                return undefined;
            }

            const cached = instances.get(name);
            if (cached)
                return cached;

            const instance = factory(definition);
            instances.set(name, instance);
            return instance;
        },

        has(name: string): boolean {
            return registry.has(name);
        },

        register(name: string, item: TInstance, autoDispose = true): () => void {
            return useRegistration(() => {
                if (instances.has(name)) {
                    throw new Error(`An item named "${name}" is already registered.`);
                }

                instances.set(name, item);

                return () => registryContext.unregister(name);
            }, autoDispose);
        },

        unregister(name: string): void {
            registry.delete(name);
            instances.delete(name);
        }
    }

    if (options.provideKey)
        provide(options.provideKey, registryContext);

    return registryContext;
}
