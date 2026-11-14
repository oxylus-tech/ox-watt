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



/**
 * This is the base class used as specification.
 * 
 * A specification allows to:
 * - define and use fields
 * - validate input value as fields ones.
 */
export class Spec
{
    /** The fields declared by this spec. */
    static fields: Record<string, SerializerField> = {};

    /** Cached resolved fields for this model class. */
    private static _resolvedFields?: Record<string, SerializerField>;

    /**
     * Returns the default values for all declared fields.
     *
     * @returns An object containing the configured default values.
     */
    static getDefaults(): Record<string, unknown> {
        const defaults: Record<string, unknown> = {};

        for (const [name, field] of Object.entries(this.getFields())) {
            if (field.defaultValue !== undefined)
                defaults[name] = field.defaultValue;
        }

        return defaults;
    }

    /**
     * Returns all fields declared by this model and its ancestors.
     *
     * Child declarations override inherited fields with the same name.
     * The result is cached independently for each model class.
     *
     * @returns The resolved field definitions.
     */
    static getFields(): Record<string, SerializerField> {
        if (!Object.prototype.hasOwnProperty.call(this, '_resolvedFields')) {
            const parent = Object.getPrototypeOf(this) as typeof Spec;

            Object.defineProperty(this, '_resolvedFields', {
                value: {
                    ...(parent !== Spec ? parent.getFields() : {}),
                    ...this.fields,
                },
                writable: true,
                configurable: true,
            });
        }

        return this._resolvedFields!;
    }

    /**
     * Returns a field declared by this model or one of its ancestors.
     *
     * @param name Field name.
     * @returns The field definition, or undefined if it does not exist.
     */
    static getField(name: string): SerializerField | undefined {
        return this.getFields()[name];
    }

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

        for (const [name, field] of Object.entries(this.getFields())) {
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
