import type { ValidationIssue } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";

/**
 * Defines options specific to string fields.
 */
export interface StringFieldConfig extends BaseFieldConfig {
    /** The minimum accepted string length. */
    minLength?: number;

    /** The maximum accepted string length. */
    maxLength?: number;

    /** A regular expression the value must match. */
    pattern?: string;

    /** Whether empty strings are accepted. */
    allowBlank?: boolean;
}

/**
 * Validates and serializes string values.
 */
export class StringField extends Field<StringFieldConfig> {
    /**
     * Creates a string field.
     * @param config The string field options.
     */
    constructor(config: StringFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        if (typeof value !== "string") {
            return [{ path, message: "Expected a string." }];
        }

        if (!this.config.allowBlank && value.length === 0) {
            issues.push({ path, message: "Blank strings are not allowed." });
        }

        if (this.config.minLength !== undefined && value.length < this.config.minLength) {
            issues.push({ path, message: `Must contain at least ${this.config.minLength} characters.` });
        }

        if (this.config.maxLength !== undefined && value.length > this.config.maxLength) {
            issues.push({ path, message: `Must contain at most ${this.config.maxLength} characters.` });
        }

        if (this.config.pattern && !new RegExp(this.config.pattern).test(value)) {
            issues.push({ path, message: "The value does not match the required pattern." });
        }

        return issues;
    }
}

