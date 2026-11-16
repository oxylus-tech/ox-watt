import type { ValidationIssue } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";

/**
 * Defines options shared by numeric fields.
 */
export interface NumberFieldConfig extends BaseFieldConfig {
    /** The minimum accepted numeric value. */
    min?: number;

    /** The maximum accepted numeric value. */
    max?: number;
}

/**
 * Defines options specific to integer fields.
 */
export interface IntegerFieldConfig extends NumberFieldConfig {}

/**
 * Converts and validates finite numeric values.
 */
export class NumberField extends Field<NumberFieldConfig> {
    /**
     * Creates a numeric field.
     * @param config The numeric field options.
     */
    constructor(config: NumberFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        if (typeof value !== "number" || !Number.isFinite(value)) {
            return [{ path, message: "Expected a finite number." }];
        }

        if (this.config.min !== undefined && value < this.config.min) {
            issues.push({ path, message: `Must be greater than or equal to ${this.config.min}.` });
        }

        if (this.config.max !== undefined && value > this.config.max) {
            issues.push({ path, message: `Must be less than or equal to ${this.config.max}.` });
        }

        return issues;
    }

    /** @inheritdoc */
    protected deserializeValue(value: unknown): unknown {
        if (typeof value === "string" && value.trim() !== "") {
            return Number(value);
        }

        return value;
    }
}

/**
 * Converts and validates integer values.
 */
export class IntegerField extends Field<IntegerFieldConfig> {
    /**
     * Creates an integer field.
     * @param config The integer field options.
     */
    constructor(config: IntegerFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        if (typeof value !== "number" || !Number.isInteger(value)) {
            return [{ path, message: "Expected an integer." }];
        }

        if (this.config.min !== undefined && value < this.config.min) {
            issues.push({ path, message: `Must be greater than or equal to ${this.config.min}.` });
        }

        if (this.config.max !== undefined && value > this.config.max) {
            issues.push({ path, message: `Must be less than or equal to ${this.config.max}.` });
        }

        return issues;
    }

    /** @inheritdoc */
    protected deserializeValue(value: unknown): unknown {
        if (typeof value === "string" && value.trim() !== "") {
            return Number(value);
        }

        return value;
    }
}

