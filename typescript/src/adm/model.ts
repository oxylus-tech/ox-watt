import type { ShallowRef } from 'vue'
import { ReactiveKeyedStore, type StoreGetOptions } from '@/utils';

import type {
    SerializerField,
    RelationDefinitions
} from './model.types';
import { Spec, type SpecClass, type SpecValidationOptions } from './spec';


export type ModelId = unknown;


/**
 * Defines the static contract shared by all model classes.
 */
export interface ModelClass<TModel extends Model = Model> extends SpecClass<ModelValidationOptions> {
    /** The fields declared by this model class. */
    fields: Record<string, SerializerField>;

    /** The unique name used to register this model. */
    modelName: string;

    /** The attribute name used as model id. */
    idField: string;

    /** The relations definitions. */
    relations: TModel["relations"]

    /**
     * Constructs an instance from already processed data.
     * @param data The values assigned to the instance.
     */
    new (data?: Record<string, unknown>): TModel;

    deserialize<T extends typeof Model>(input: unknown, options?: ModelDeserializeOptions): InstanceType<T>;
}

export type ModelOf<TModelClass extends ModelClass> = InstanceType<TModelClass>;
export type ModelStoreOf<TModelClass extends ModelClass> = ModelStore<ModelOf<TModelClass>>;
export type ModelRefOf<TModelClass extends ModelClass> = ShallowRef<ModelOf<TModelClass>>;

/**
 * Serialization options for a model instance.
 */
export interface ModelSerializeOptions {
    /** Optional list of field names to serialize. */
    fields?: string[];
}

/**
 * Options for model deserialization.
 */
export interface ModelDeserializeOptions { 
    /** Allow partial deserialization. **/
    partial?: boolean;

    /** Do not throw error on deserialization error **/
    noExc?: boolean

    /**
     * Save item into the model store.
     * 
     * This is at handled at the repository level.
     */
    save?: boolean;
}

/**
 * Options controlling model validation.
 */
export interface ModelValidationOptions extends SpecValidationOptions {}


/**
 * Defines the structure and behavior of model instances.
 */
export class Model extends Spec {
    [key: string]: unknown;

    /** The fields declared by this model class. */
    static fields: Record<string, SerializerField> = {};

    /** The relations on this model class. */
    static relations: RelationDefinitions = {};

    /** The name used to register this model class. */
    static modelName = 'Model';

    /** Attribute name used as model id. */
    static idField = 'id';

    /**
     * Creates an instance by assigning its supplied data without validation.
     * @param data The values to assign to the instance.
     */
    constructor(data: Record<string, unknown> = {}) {
        super();
        Object.assign(this, data);
    }

    get $id(): ModelId {
        return this[(this.constructor as typeof Model).idField]
    }

    /**
     * Deserializes and validates model data.
     *
     * @param input Raw model data.
     * @param options Deserialization options.
     * @returns A new model instance.
     */
    static deserialize<T extends typeof Model>(
        input: unknown,
        options?: ModelDeserializeOptions,
    ): InstanceType<T> {
        if (typeof input !== 'object' || input === null || Array.isArray(input)) {
            throw new TypeError(
                `Expected an object to deserialize "${this.modelName}".`,
            );
        }

        const source = input as Record<string, unknown>;
        const data: Record<string, unknown> = {};

        for (const [name, field] of Object.entries(this.fields)) {
            if (field.readOnly || !(name in source)) {
                continue;
            }

            data[name] = field.deserialize(source[name], {
                modelOptions: options ?? {},
            });
        }

        this.validate(data, { partial: options?.partial });

        return new this(data) as InstanceType<T>;
    }

    /**
     * Serializes this model instance.
     *
     * @param options Serialization options or a list of field names.
     * @returns The serialized model data.
     */
    serialize(
        options: ModelSerializeOptions | string[] = {},
    ): Record<string, unknown> {
        const modelClass = this.constructor as typeof Model;
        const normalized: ModelSerializeOptions = Array.isArray(options)
            ? { fields: options ?? undefined }
            : options;

        const names = normalized.fields ?? Object.keys(modelClass.fields);
        const data: Record<string, unknown> = {};

        for (const name of names) {
            const field = modelClass.fields[name];

            if (!field || field.writeOnly || !(name in this)) {
                continue;
            }

            data[name] = field.serialize(
                (this as Record<string, unknown>)[name],
                {
                    modelOptions: normalized,
                },
            );
        }

        return data;
    }
}


/**
 * Get options for the ModelStore.
 */

export interface ModelStoreGetOptions extends StoreGetOptions {
}


/**
 * In-memory storage for a single model type.
 *
 * One ModelStore instance is intended to be owned by one Repository.
 */
export class ModelStore<
        TModel extends Model,
        TGetOptions extends ModelStoreGetOptions = ModelStoreGetOptions,
    >
    extends ReactiveKeyedStore<ModelId, TModel, TGetOptions>
{
    static override keyField = "$id"

    constructor(
        readonly model: ModelClass<TModel>,
        items?: Map<ModelId, TModel>|null,
    ){
        super(items)
    }
}
