import type { SerializerField, ValidationIssue, FieldSerializeContext } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";


/**
 * Defines options specific to list fields.
 */
export interface ListFieldConfig extends BaseFieldConfig {
    /** The minimum number of accepted elements. */
    minLength?: number;

    /** The maximum number of accepted elements. */
    maxLength?: number;
}

/**
 * Validates and transforms arrays using a dedicated child field.
 */
export class ListField extends Field<ListFieldConfig> {
    /**
     * Creates a list field.
     * @param child The field used to process each element.
     * @param config The list-specific options.
     */
    constructor(
        private readonly child: SerializerField,
        config: ListFieldConfig = {},
    ) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        if (!Array.isArray(value)) {
            return [{ path, message: "Expected an array." }];
        }

        if (this.config.minLength !== undefined && value.length < this.config.minLength) {
            issues.push({ path, message: `Must contain at least ${this.config.minLength} elements.` });
        }

        if (this.config.maxLength !== undefined && value.length > this.config.maxLength) {
            issues.push({ path, message: `Must contain at most ${this.config.maxLength} elements.` });
        }

        value.forEach((item, index) => {
            issues.push(...this.child.validate(item, `${path}[${index}]`));
        });

        return issues;
    }

    /** @inheritdoc */
    serialize(value: unknown, _context?: FieldSerializeContext): unknown {
        if (value === undefined) {
            return undefined;
        }

        if (value === null) {
            this.assertValid(value);
            return null;
        }

        this.assertValid(value);
        return this.serializeValue(value);
    }

    /** @inheritdoc */
    protected serializeValue(value: unknown): unknown {
        return (value as unknown[]).map((item) => this.child.serialize(item));
    }

    /** @inheritdoc */
    protected deserializeValue(value: unknown): unknown {
        return (value as unknown[]).map((item) => this.child.deserialize(item));
    }
}
