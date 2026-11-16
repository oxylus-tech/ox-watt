import { Field, type BaseFieldConfig } from "./field";
import type { FieldDeserializeContext, FieldSerializeContext, ValidationIssue, ModelResolver } from "../model.types"
import type { ModelClass } from "../model";

/**
 * Configuration for a nested model field.
 */
export interface ModelFieldConfig extends BaseFieldConfig {
    /** The model class or registered model name. */
    model: ModelClass | string;
    /** Optional list of model fields to serialize. */
    fields?: string[];
}

/**
 * Serializes and deserializes nested model objects.
 * 
 * Note: it does not link to the database: the model stores are not used here.
 */
export class ModelField extends Field<ModelFieldConfig> {
    private readonly resolveModel: ModelResolver;

    /**
     * Creates a nested model field.
     * @param config The field configuration.
     * @param resolveModel Resolves model names to registered model classes.
     */
    constructor(config: ModelFieldConfig, resolveModel: ModelResolver) {
        super(config);
        this.resolveModel = resolveModel;
    }

    /**
     * Validates a nested model object.
     */
    override validate(value: unknown, path = ""): ValidationIssue[] {
        const baseIssues = this.validateBase(value, path);

        if (baseIssues.length > 0 || value === undefined || value === null) {
            return baseIssues;
        }

        try {
            this.getModel().validate(value);
            return [];
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Invalid nested model.";

            return [{ path, message }];
        }
    }

    /**
     * Serializes a nested model instance.
     */
    override serialize(value: unknown, context?: FieldSerializeContext): unknown {
        if (value === undefined || value === null) {
            this.assertValid(value);
            return value;
        }

        this.assertValid(value);

        const model = this.getModel();

        if (!(value instanceof model)) {
            throw new TypeError(
                `Expected an instance of model "${model.modelName}".`,
            );
        }

        return value.serialize({
            ...context?.modelOptions,
            fields: this.config.fields,
        });
    }

    /**
     * Deserializes a nested model object.
     */
    override deserialize(value: unknown, context?: FieldDeserializeContext): unknown {
        if (value === undefined || value === null) {
            this.assertValid(value);
            return value;
        }
        this.assertValid(value);

        return this.getModel().deserialize(value, {
            ...context?.modelOptions,
            partial: false
        })
    }

    private getModel(): ModelClass {
        return typeof this.config.model === "string"
            ? this.resolveModel(this.config.model)
            : this.config.model;
    }
}

