import type { ActionInstance, ToolsetInstance } from "../../types"


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
     * Overrides the action definition description text.
     */
    description?: string;

    /**
     * Hide title.
     */
    noTitle?: boolean;

    /** Hide description. */
    noDescription?: boolean;
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
