import type {ValidationIssue, ValidationRule} from "../model.types"
import type {Model} from "../model"
import type {Field, Widget} from "../fields"


/**
 * Props accepted by {@link OwField}.
 */
export interface OwFieldProps {
    /** Field definition. */
    field: Field;

    /** Current field value. */
    modelValue?: unknown;

    /** Optional field name. */
    name?: string;

    /** Optional input identifier. */
    id?: string;

    /** Label displayed above the widget. */
    label?: string;

    /** Help text displayed below the widget. */
    help?: string;

    /** Validation issues associated with the field. */
    errors?: (ValidationIssue|string)[];

    /** Extra form field validation rules **/
    rules?: ValidationRule[];

    /** Items passed to selection widgets. */
    items?: unknown[];

    /** Widget overriding the field default. */
    widget?: Widget;

    /** Whether the field is required. */
    required?: boolean;

    /** Whether the field is disabled. */
    disabled?: boolean;

    /** Whether the field is read-only. */
    readonly?: boolean;
}



/**
 * Props accepted by {@link OwModelField}.
 */
export interface OwModelFieldProps {
    /**
     * Model instance whose fields are rendered.
     */
    model: Model;

    /**
     * Ordered layout describing the fields to render.
     */
    fields: ModelFieldsLayout;

    /**
     * Validation errors indexed by field name.
     */
    errors?: Record<string, string[]>;

    /**
     * Whether all fields are disabled by default.
     */
    disabled?: boolean;

    /**
     * Whether all fields are readonly by default.
     */
    readonly?: boolean;
}

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
