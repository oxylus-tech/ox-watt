import type { SerializerField, ValidationIssue, FieldDeserializeContext, FieldSerializeContext } from "../model.types"


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
}

/**
 * Represents a validation failure containing one or more issues.
 */
export class ValidationError extends Error {
    /** The validation issues that caused the error. */
    readonly issues: ValidationIssue[];

    /**
     * Creates a validation error.
     * @param issues The validation issues that caused the error.
     */
    constructor(issues: ValidationIssue[]) {
        super(issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n"));
        this.name = "ValidationError";
        this.issues = issues;
    }
}

/**
 * Provides common behavior for typed fields.
 * @typeParam TConfig The configuration type accepted by the field.
 */
export abstract class Field<TConfig extends BaseFieldConfig = BaseFieldConfig>
    implements SerializerField
{
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

