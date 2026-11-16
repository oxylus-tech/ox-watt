import type { ValidationIssue } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";

/**
 * Defines options specific to JSON-compatible fields.
 */
export interface JSONFieldConfig extends BaseFieldConfig {}

/**
 * Accepts JSON-compatible values without additional transformation.
 */
export class JSONField extends Field<JSONFieldConfig> {
    /**
     * Creates a JSON field.
     * @param config The JSON field options.
     */
    constructor(config: JSONFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        try {
            JSON.stringify(value);
            return [];
        } catch {
            return [{ path, message: "Expected a JSON-serializable value." }];
        }
    }
}
