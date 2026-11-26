/**
 * Provides common descriptive properties for a named definition.
 *
 * @template TRequiredTitle - Whether the title is required.
 */
/**
 * Provides common descriptive properties for a named definition.
 */
export interface NamedDefinitionBase {
    name: string;
    title?: string;
    description?: string;
    icon?: string;
}

/**
 * Provides common descriptive properties for a named definition with an optional title.
 */
export interface NamedDefinition extends Omit<NamedDefinitionBase, 'title'> {
    title?: string;
}



export interface NamedGroupDefinitionBase<TItem>
    extends NamedDefinitionBase
{
    items: TItem[];
}


/**
 * Represents a named group containing items.
 *
 * The item type determines whether the group is a simple container or
 * supports nested groups.
 *
 * Examples:
 *
 * Simple container:
 * ```ts
 * interface Action extends NamedDefinition {
 *     execute: () => void;
 * }
 *
 * interface ActionGroup extends NamedGroupDefinition<Action, false> {}
 * ```
 *
 * Tree of named definitions:
 * ```ts
 * interface DefinitionTreeItem
 *     extends NamedDefinition<false> {}
 *
 * interface DefinitionTree
 *     extends NamedGroupDefinition<
 *         DefinitionTreeItem | DefinitionTree,
 *         false
 *     > {}
 * ```
 *
 * Container of arbitrary objects:
 * ```ts
 * interface ProductGroup extends NamedGroupDefinition<Product, false> {}
 * ```
 *
 * @template TItem - The type of items contained in the group.
 * @template TRequiredTitle - Whether the title is required.
 */
export interface NamedGroupDefinition<TItem>
    extends NamedDefinition
{
    items: TItem[];
}


/**
 * Checks whether a definition is a named group.
 *
 * @param definition - The definition to inspect.
 * @returns Whether the definition contains an items array.
 */
export function isNamedGroupDefinition<TItem>(
    definition: NamedDefinition | NamedGroupDefinition<TItem>,
): definition is NamedGroupDefinition<TItem> {
    return 'items' in definition && Array.isArray(definition.items);
}
