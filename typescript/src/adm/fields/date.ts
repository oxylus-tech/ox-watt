import type { ValidationIssue } from '../model.types'
import { Field, type BaseFieldConfig } from "./field";

/**
 * Defines options specific to date fields.
 */
export interface DateFieldConfig extends BaseFieldConfig {}

/**
 * Converts external date values into Date objects.
 */
export class DateField extends Field<DateFieldConfig> {
    /**
     * Creates a date field.
     * @param config The date field options.
     */
    constructor(config: DateFieldConfig = {}) {
        super(config);
    }

    /** @inheritdoc */
    validate(value: unknown, path = ""): ValidationIssue[] {
        const issues = this.validateBase(value, path);

        if (issues.length || value === undefined || value === null) {
            return issues;
        }

        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
            return [{ path, message: "Expected a valid Date object." }];
        }

        return [];
    }

    /** @inheritdoc */
    protected serializeValue(value: unknown): unknown {
        return (value as Date).toISOString();
    }

    /** @inheritdoc */
    protected deserializeValue(value: unknown): unknown {
        if (typeof value === "string" || typeof value === "number") {
            return new Date(value);
        }

        return value;
    }
}

