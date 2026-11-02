import type { SerializerField, ValidationIssue } from "./model.types";
import { ValidationError} from "./fields/field";



/**
 * A class of Spec.
 */
export interface SpecClass<TValidationOptions=SpecValidationOptions> {
    /**
     * Validates a value without transforming it.
     * @param value The value to validate.
     * @param path The path used in validation issues.
     * @returns The validation issues found.
     */
    validate(value: unknown, options?: TValidationOptions): ValidationIssue[]|null;
}


/**
 * Options controlling model validation.
 */
export interface SpecValidationOptions {
    /** Whether missing required fields are allowed. */
    partial?: boolean;
    /** Don't throw exception but return boolean **/
    noExc?: boolean;
}



export class Spec
{

    static fields: Record<string, SerializerField> = {};

    /**
     * Validates data against the fields declared by the concrete model class.
     * @param data The data to validate.
     * @param noExc Whether to return false instead of throwing on invalid data.
     * @returns True when valid, or false when invalid and noExc is true.
     * @throws ValidationError If validation fails and noExc is false.
     */
    static validate(
        data: unknown,
        options?: SpecValidationOptions,
    ): ValidationIssue[]|null {
        const issues = this.collectValidationIssues(data, options);

        if (issues.length === 0) return null;
        if (options?.noExc) return issues;

        throw new ValidationError(issues);
    }

    /**
     * Collects validation issues without constructing a model instance.
     * @param data The data to validate.
     * @returns All validation issues found.
     */
    protected static collectValidationIssues(
        this: typeof Spec,
        data: unknown,
        options?: SpecValidationOptions,
    ): ValidationIssue[] {
        if (!this.isRecord(data)) {
            return [{ path: "", message: "Expected an object." }];
        }

        const issues: ValidationIssue[] = [];

        for (const [name, field] of Object.entries(this.fields)) {
            if (field.readOnly || (options?.partial && !(name in data))) {
                continue;
            }

            issues.push(...field.validate(data[name], name));
        }

        return issues;
    }

    /**
     * Checks whether a value is a non-null object and not an array.
     * @param value The value to check.
     * @returns Whether the value is a record.
     */
    protected static isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === "object" && value !== null && !Array.isArray(value);
    }
}
