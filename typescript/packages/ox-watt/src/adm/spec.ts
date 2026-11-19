import { resolveStaticValues } from '@/utils/functional';
import type { SerializerField, ValidationIssue, ValidationRule } from "./model.types";
import { ValidationError} from "./model.types";



/**
 * A class of Spec.
 */
export interface SpecClass<TValidationOptions=SpecValidationOptions> {
    rules?: ValidationRule[];

    validate(value: unknown, options?: TValidationOptions): ValidationIssue[]|null;
    getDefaults(): Record<string, unknown>;
    getFields(): Record<string, SerializerField>;
    getField(name: string): SerializerField | undefined;
    runRules(data: unknown, options?: SpecValidationOptions): string[]
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

    /** Form validation rules. */
    static rules?: ValidationRule[];

    /** Cached resolved fields for this spec class. */
    private static _resolvedFields?: Record<string, SerializerField>;

    /** Cached resolved rules for this spec class. */
    private static _resolvedRules?: ValidationRule[];

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
        return resolveStaticValues(
            this,
            "_resolvedFields",
            "getFields",
            this.fields
        )
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
     * Return all rules declared by this model and its ancestors.
     *
     * Child declarations are appended to parent's ones.
     *
     * @returns The resolved validation rules.
     */
    static getRules(): ValidationRule[] {
        return resolveStaticValues(
            this,
            "_resolvedRules",
            "getRules",
            this.rules
        )
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
     * Run rules and return errors message
     */
    static runRules(data: unknown, options?: SpecValidationOptions): string[] {
        const results = (
            this.getRules().map((rule) => rule(data))
                .filter((result) => typeof result == "string" && result)
        )
        return results as string[]
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
