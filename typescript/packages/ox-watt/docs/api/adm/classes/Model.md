[**@oxylus/ox-watt**](../../index.md)

***

[@oxylus/ox-watt](../../index.md) / [adm](../index.md) / Model

# Class: Model

Defined in: [src/adm/model.ts:87](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L87)

Defines the structure and behavior of model instances.

## Extends

- [`Spec`](Spec.md)

## Indexable

> \[`key`: `string`\]: `unknown`

## Constructors

### Constructor

> **new Model**(`data?`): `Model`

Defined in: [src/adm/model.ts:115](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L115)

Creates an instance by assigning its supplied data without validation.

#### Parameters

##### data?

`Record`\<`string`, `unknown`\> = `{}`

The values to assign to the instance.

#### Returns

`Model`

#### Overrides

[`Spec`](Spec.md).[`constructor`](Spec.md#constructor)

## Properties

### app?

> `static` `optional` **app?**: `string`

Defined in: [src/adm/model.ts:106](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L106)

Application name owning the model class.

***

### fields

> `static` **fields**: `Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\> = `{}`

Defined in: [src/adm/model.ts:91](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L91)

The fields declared by this model class.

#### Overrides

[`Spec`](Spec.md).[`fields`](Spec.md#fields)

***

### idField

> `static` **idField**: `string` = `'id'`

Defined in: [src/adm/model.ts:109](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L109)

Attribute name used as model id.

***

### modelName

> `static` **modelName**: `string` = `'model'`

Defined in: [src/adm/model.ts:103](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L103)

The name used to register this model class.
It should match to corresponding backend's model if any.

***

### relations

> `static` **relations**: [`RelationDefinitions`](../type-aliases/RelationDefinitions.md) = `{}`

Defined in: [src/adm/model.ts:94](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L94)

The relations on this model class.

***

### rules?

> `static` `optional` **rules?**: [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:45](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L45)

Form validation rules.

#### Inherited from

[`Spec`](Spec.md).[`rules`](Spec.md#rules)

## Accessors

### $id

#### Get Signature

> **get** **$id**(): `unknown`

Defined in: [src/adm/model.ts:121](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L121)

Return the instance's id as configured by the model (`idField`)

##### Returns

`unknown`

***

### entity

#### Get Signature

> **get** `static` **entity**(): `string`

Defined in: [src/adm/model.ts:130](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L130)

Complete model name prefixed with the app's one if any.

It follows the same convention as Django's models for interoperability.

##### Returns

`string`

## Methods

### copy()

> **copy**(): `this`

Defined in: [src/adm/model.ts:242](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L242)

Creates an independent copy of the model's declared fields.

#### Returns

`this`

A copied model instance.

***

### serialize()

> **serialize**(`options?`): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/model.ts:256](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L256)

Serializes this model instance.

#### Parameters

##### options?

`string`[] \| [`ModelSerializeOptions`](../interfaces/ModelSerializeOptions.md) = `{}`

Serialization options or a list of field names.

#### Returns

`Record`\<`string`, `unknown`\>

The serialized model data.

***

### deserialize()

> `static` **deserialize**\<`T`\>(`input`, `options?`): `InstanceType`\<`T`\>

Defined in: [src/adm/model.ts:209](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L209)

Deserializes and validates model data.

#### Type Parameters

##### T

`T` *extends* *typeof* `Model`

#### Parameters

##### input

`unknown`

Raw model data.

##### options?

[`ModelDeserializeOptions`](../interfaces/ModelDeserializeOptions.md)

Deserialization options.

#### Returns

`InstanceType`\<`T`\>

A new model instance.

***

### getDefaults()

> `static` **getDefaults**(): `Record`\<`string`, `unknown`\>

Defined in: [src/adm/spec.ts:58](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L58)

Returns the default values for all declared fields.

#### Returns

`Record`\<`string`, `unknown`\>

An object containing the configured default values.

#### Inherited from

[`Spec`](Spec.md).[`getDefaults`](Spec.md#getdefaults)

***

### getField()

> `static` **getField**(`name`): [`SerializerField`](../interfaces/SerializerField.md) \| `undefined`

Defined in: [src/adm/spec.ts:92](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L92)

Returns a field declared by this model or one of its ancestors.

#### Parameters

##### name

`string`

Field name.

#### Returns

[`SerializerField`](../interfaces/SerializerField.md) \| `undefined`

The field definition, or undefined if it does not exist.

#### Inherited from

[`Spec`](Spec.md).[`getField`](Spec.md#getfield)

***

### getFields()

> `static` **getFields**(): `Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\>

Defined in: [src/adm/spec.ts:77](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L77)

Returns all fields declared by this model and its ancestors.

Child declarations override inherited fields with the same name.
The result is cached independently for each model class.

#### Returns

`Record`\<`string`, [`SerializerField`](../interfaces/SerializerField.md)\>

The resolved field definitions.

#### Inherited from

[`Spec`](Spec.md).[`getFields`](Spec.md#getfields)

***

### getRelation()

> `static` **getRelation**(`name`): [`RelationDefinition`](../interfaces/RelationDefinition.md)\<`Model`\> \| `undefined`

Defined in: [src/adm/model.ts:197](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L197)

Returns a relation declared by this model or one of its ancestors.

#### Parameters

##### name

`string`

Relation name.

#### Returns

[`RelationDefinition`](../interfaces/RelationDefinition.md)\<`Model`\> \| `undefined`

The relation definition, or undefined if it does not exist.

***

### getRelations()

> `static` **getRelations**(): [`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

Defined in: [src/adm/model.ts:174](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L174)

Returns all relations declared by this model and its ancestors.

Child declarations override inherited relations with the same name.
The result is cached independently for each model class.

#### Returns

[`RelationDefinitions`](../type-aliases/RelationDefinitions.md)

The resolved relation definitions.

***

### getRules()

> `static` **getRules**(): [`ValidationRule`](../type-aliases/ValidationRule.md)[]

Defined in: [src/adm/spec.ts:103](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L103)

Return all rules declared by this model and its ancestors.

Child declarations are appended to parent's ones.

#### Returns

[`ValidationRule`](../type-aliases/ValidationRule.md)[]

The resolved validation rules.

#### Inherited from

[`Spec`](Spec.md).[`getRules`](Spec.md#getrules)

***

### i18n()

> `static` **i18n**(`key?`, ...`args`): `string`

Defined in: [src/adm/model.ts:149](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L149)

Return a translation for this model.

#### Parameters

##### key?

`string`

##### args

...`unknown`[]

#### Returns

`string`

***

### i18nKey()

> `static` **i18nKey**(`key?`): `string`

Defined in: [src/adm/model.ts:139](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L139)

Return the key used in i18n.

#### Parameters

##### key?

`string`

#### Returns

`string`

***

### label()

> `static` **label**(`field?`): `string`

Defined in: [src/adm/model.ts:155](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L155)

Return the model's (or one of its fields) translated label.

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### labelPlural()

> `static` **labelPlural**(`field?`): `string`

Defined in: [src/adm/model.ts:161](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/model.ts#L161)

Same as `label`, but in plural form.

#### Parameters

##### field?

`string`

#### Returns

`string`

***

### runRules()

> `static` **runRules**(`data`, `options?`): `string`[]

Defined in: [src/adm/spec.ts:134](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L134)

Run rules and return errors message

#### Parameters

##### data

`unknown`

##### options?

[`SpecValidationOptions`](../interfaces/SpecValidationOptions.md)

#### Returns

`string`[]

#### Inherited from

[`Spec`](Spec.md).[`runRules`](Spec.md#runrules)

***

### validate()

> `static` **validate**(`data`, `options?`): [`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

Defined in: [src/adm/spec.ts:119](https://github.com/oxylus-tech/ox-watt/blob/3058bd6fa1f0b9cbe54e9a26e4f0e2aa0213b3e4/typescript/src/adm/spec.ts#L119)

Validates data against the fields declared by the concrete model class.

#### Parameters

##### data

`unknown`

The data to validate.

##### options?

[`SpecValidationOptions`](../interfaces/SpecValidationOptions.md)

#### Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)[] \| `null`

True when valid, or false when invalid and noExc is true.

#### Throws

ValidationError If validation fails and noExc is false.

#### Inherited from

[`Spec`](Spec.md).[`validate`](Spec.md#validate)
