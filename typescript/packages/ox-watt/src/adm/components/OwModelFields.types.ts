
/**
 * Configuration of a model field in the layout.
 */
export interface FieldConfig {
    /**
     * Name of the model field.
     */
    name: string;

    /**
     * Props and attributes forwarded to OwField.
     */
    props?: Record<string, unknown>;
}

/**
 * Visual group of fields.
 */
export interface FieldSet {
    /**
     * Fieldset title.
     */
    title: string;

    /**
     * Fields displayed in this group, in display order.
     */
    fields: Array<string | FieldConfig>;
}

/**
 * Model fields layout.
 *
 * Fields can be declared individually or grouped into fieldsets.
 */
export type ModelFieldsLayout = Array<string | FieldConfig | FieldSet>;
