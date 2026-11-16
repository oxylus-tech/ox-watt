import { resolveStaticValues } from '@/utils/functional';
import type {
    SerializerField,
    ValidationIssue,
    ValidationRule,
    FieldDeserializeContext,
    FieldSerializeContext
} from "../model.types"
import type { Enum } from "../enum"
import type { Widget } from "./widget";
import { ValidationError } from '../model.types';


/**
 * Defines common options supported by all fields.
 */
export interface BaseFieldConfig {
    /** Whether the field is required during complete validation. */
    required?: boolean;

    /** Whether the field accepts null values. */
    nullable?: boolean;

    /** Whether the field is excluded from serialized output. */
    writeOnly?: boolean;

    /** Whether the field is excluded from deserialized output. */
    readOnly?: boolean;

    /** The default value applied when a value is absent. */
    default?: unknown;

    /** Enum providing the available field choices. */
    choices?: Enum

    /** Widget used to render the field. */
    widget?: Widget;

    /** Additional validation rules applied to the field. **/
    rules?: ValidationRule[];
}

/**
 * Provides common behavior for typed fields.
 * @typeParam TConfig The configuration type accepted by the field.
 */
export abstract class Field<TConfig extends BaseFieldConfig = BaseFieldConfig>
    implements SerializerField
{
    /** Default widget used by fields of this class. */
    static widget?: Widget;

    /** Default validation rules to apply at all times. **/
    static rules?: ValidationRule[];

    private static _resolvedRules?: ValidationRule[];

    protected readonly config: TConfig;
        
    /**
     * Creates a field with its configuration.
     * @param config The options controlling the field behavior.
     */
    protected constructor(config: TConfig = {} as TConfig) {
        this.config = config
    }

    /** Whether a value is required. */
    get required(): boolean {
        return this.config.required ?? false;
    }

    /** Whether null is an allowed value. */
    get nullable(): boolean {
        return this.config.nullable ?? false;
    }

    /** Whether the field is excluded from deserialization input. */
    get readOnly(): boolean {
        return this.config.readOnly ?? false;
    }

    /** Whether the field is excluded from serialized output. */
    get writeOnly(): boolean {
        return this.config.writeOnly ?? false;
    }

    /**
     * Returns the configured default value.
     */
    get defaultValue(): unknown {
        return this.config.default;
    }
    
    /**
     * Returns the widget configured for this field.
     *
     * The instance configuration takes precedence over the class default.
     */
    get widget(): Widget | undefined {
        return this.config.widget ?? (this.constructor as typeof Field).widget;
    }

    /**
     * Returns the validation rules declared by this field class and its parents.
     *
     * @returns The inherited validation rules.
     */
    static getRules(): ValidationRule[] {
        return resolveStaticValues(
            this,
            "_resolvedRules",
            "getRules",
            Object.prototype.hasOwnProperty.call(this, "rules")
                ? this.rules
                : [],
        );
    }

    /**
     * Returns all form validation rules applicable to this field instance.
     *
     * Static rules are inherited from the field class hierarchy. Instance rules
     * are appended afterwards.
     *
     * @returns The validation rules for this field instance.
     */
    getRules(): ValidationRule[] {
        return [
            ...(this.constructor as typeof Field).getRules(),
            ...(this.config.rules ?? []),
        ];
    }

    /**
     * Serializes a value after validating it.
     * @param value The internal value to serialize.
     * @returns The serialized value.
     */
    serialize(value: unknown, _context?: FieldSerializeContext): unknown {
        if (value === undefined) {
            return undefined;
        }

        this.assertValid(value);
        return this.serializeValue(value);
    }

    /**
     * Deserializes a value and validates the resulting representation.
     * @param value The external value to deserialize.
     * @returns The deserialized value.
     */
    deserialize(value: unknown, _context?: FieldDeserializeContext): unknown {
        if (value === undefined) {
            return undefined;
        }

        if (value === null) {
            this.assertValid(value);
            return null;
        }

        const result = this.deserializeValue(value);
        this.assertValid(result);
        return result;
    }

    /**
     * Validates a value and throws when validation fails.
     * @param value The value to validate.
     * @param path The path used in validation issues.
     */
    protected assertValid(value: unknown, path = ""): void {
        const issues = this.validate(value, path);

        if (issues.length > 0) {
            throw new ValidationError(issues);
        }
    }

    /**
     * Validates common nullability and required constraints.
     * @param value The value to validate.
     * @param path The path used in validation issues.
     * @returns Common validation issues.
     */
    protected validateBase(value: unknown, path = ""): ValidationIssue[] {
        if (value === undefined) {
            return this.config.required
                ? [{ path, message: "This field is required." }]
                : [];
        }

        if (value === null) {
            return this.config.nullable
                ? []
                : [{ path, message: "Null is not allowed." }];
        }

        return [];
    }

    /**
     * Validates a value against this field's constraints.
     * @param value The value to validate.
     * @param path The path used in validation issues.
     * @returns The validation issues found.
     */
    validate(value: unknown, path = ""): ValidationIssue[] {
        if (value === undefined) {
            return this.required ? [{ path, message: "This field is required." }] : [];
        }

        if (value === null) {
            return this.nullable ? [] : [{ path, message: "This field may not be null." }];
        }

        return [];
    }

    /**
     * Converts a validated internal value into its external representation.
     * @param value The value to serialize.
     * @returns The serialized value.
     */
    protected serializeValue(value: unknown): unknown {
        return value;
    }

    /**
     * Converts an external value into its internal representation.
     * @param value The value to deserialize.
     * @returns The deserialized value.
     */
    protected deserializeValue(value: unknown): unknown {
        return value;
    }
}

