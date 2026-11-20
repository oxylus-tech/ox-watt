export interface ToolsetDefinition {
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
     * Ordered names of the actions displayed by this toolset.
     */
    actions: string[];
}
