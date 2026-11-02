import type { ShallowRef, MaybeRef } from 'vue'

import type { Model, ModelClass, ModelSerializeOptions, ModelDeserializeOptions } from './model'
import type { RepositoryModel, Repositories } from './repository'

// ---- Spec
/**
 * Common contract for the fields of a Spec.
 */
export interface ISpec {
}

/**
 * A field validation issue.
 */
export interface ValidationIssue {
    path: string;
    message: string;
}

// ---- Field
/**
 * Defines the serialization, deserialization, and validation contract.
 */
export interface SerializerField {
    readonly required: boolean;
    readonly nullable: boolean;
    readonly readOnly: boolean;
    readonly writeOnly: boolean;

    /**
     * Converts an internal value into its external representation.
     * @param value The value to serialize.
     * @returns The serialized value.
     */
    serialize(value: unknown, context?: FieldSerializeContext): unknown;

    /**
     * Converts an external value into its internal representation.
     * @param value The value to deserialize.
     * @returns The deserialized value.
     */
    deserialize(value: unknown, context?: FieldDeserializeContext): unknown;

    /**
     * Validates a value without transforming it.
     * @param value The value to validate.
     * @param path The path used in validation issues.
     * @returns The validation issues found.
     */
    validate(value: unknown, path?: string): ValidationIssue[];
}

/**
 * Context passed to field serialization.
 */
export interface FieldSerializeContext {
    modelOptions?: ModelSerializeOptions;
}

/**
 * Context passed to field deserialization.
 */
export interface FieldDeserializeContext {
    modelOptions?: Omit<ModelDeserializeOptions, "partial">;
}

/**
 * Serialization options for a relation.
 */
export interface RelationSerializeOptions {
    /** Whether to serialize the relation as a nested object. */
    nested?: boolean;

    /** Optional field selection for the related model. */
    fields?: string[];

    /** Options for relations of the related model. */
    relations?: Record<string, RelationSerializeOptions>;
}

// ---- Model
/**
 * Definition of a relation on the model. 
 */
export interface RelationDefinition<TModel extends Model = Model> {
    /** Related model name. */
    repository: string;

    /** Field on the current model containing the related identifier. */
    source: string;

    /** Whether the relation resolves to multiple models. */
    many?: boolean
}

/** Relation definitions by relation name. */
export type RelationDefinitions = Record<string, RelationDefinition>;

/**
 * A resolved relation containing one or more related models.
 */
export type ResolvedRelation<
    TModel extends Model,
    TMany extends boolean,
    TStored extends boolean = true,
> =
    TStored extends true
        ? (TMany extends true ? ShallowRef<TModel>[] : ShallowRef<TModel>)
        : (TMany extends true ? MaybeRef<TModel>[] : MaybeRef<TModel>);

/**
 * Resolves the related model type associated with a relation definition.
 */
export type ResolvedRelationType<
    TRepositories extends Repositories,
    TDefinition extends RelationDefinition,
    TStored extends boolean = true
> =
    TDefinition["repository"] extends keyof TRepositories
        ? ResolvedRelation<
            RepositoryModel<TRepositories[TDefinition["repository"]]>,
            TDefinition["many"] extends true ? true : false,
            TStored
        >
        : never;

/**
 * A model together with its resolved relations.
 */
/**
 * Resolved relations for a model instance and its model class.
 */
export interface ResolvedRelations<
    TModel extends Model,
    TDefinitions extends RelationDefinitions,
    TRepositories extends Repositories,
    TStored extends boolean = true
> {
    /** Original model instance. */
    item: TModel;

    /** Resolved relations indexed by their model relation names. */
    relations: Partial<{
        [K in keyof TDefinitions]: ResolvedRelationType<TRepositories, TDefinitions[K], TStored>
    }>;
}

/**
 * Defines model relations while preserving their literal types.
 *
 * @param relations Relation definitions.
 * @returns The same relation definitions with their inferred types preserved.
 */
export function defineRelations<const T extends RelationDefinitions>(
    relations: T
): T {
    return relations;
}


/**
 * Represents a serialized model instance that can be used as a relation.
 */
export interface RelatedModelInstance {
    serialize(options?: ModelSerializeOptions): Record<string, unknown>;
}

/**
 * Resolves a registered model class by name.
 */
export type ModelResolver = (name: string) => ModelClass;


export interface ModelConstructor<T extends object> {
    new (...args: any[]): T;
}

