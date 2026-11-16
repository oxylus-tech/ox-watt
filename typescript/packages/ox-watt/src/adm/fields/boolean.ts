import type { ValidationIssue } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";

/**
 * Defines options specific to boolean fields.
 */
export interface BooleanFieldConfig extends BaseFieldConfig {}

/**
 * Validates boolean values.
 */
export class BooleanField extends Field<BooleanFieldConfig> {
    /**
     * Creates a boolean field.
     * @param config The boolean field options.
     */
    constructor(config: BooleanFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        return typeof value === "boolean" ? [] : [{ path, message: "Expected a boolean." }];
    }

    /** @inheritdoc */
    protected deserializeValue(value: unknown): unknown {
        if (value === "true" || value === 1) {
            return true;
        }

        if (value === "false" || value === 0) {
            return false;
        }

        return value;
    }
}

