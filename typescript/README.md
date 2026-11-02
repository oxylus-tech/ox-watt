# @oxylus/data-client

Framework-independent TypeScript primitives for model definitions, HTTP endpoints, Ajv schema validation, query results and optional storage.

## Principles

- Model/schema/endpoint definitions are separate from runtime data.
- `fetch()` never inserts an object into a query result.
- Each `Query` owns its own result array and state.
- No global identity map and no reference counting.
- Storage is opt-in per result via an explicit `cacheKey`.
- Vue integration and automatic relation loading are deliberately out of scope for this MVP.

## Quick start

```ts
import {
    HttpTransport,
    MemoryStorage,
    ModelRegistry,
    Repository,
    SchemaRegistry,
    defineSchema,
} from "@oxylus/data-client";
import type { ApiDefinition, ModelDefinition } from "@oxylus/data-client";
import type { JSONSchemaType } from "ajv";

interface Contact {
    id: number;
    name: string;
}

const contactSchema: JSONSchemaType<Contact> = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
    },
    required: ["id", "name"],
    additionalProperties: false,
};

const schemas = new SchemaRegistry();
const listResultSchema = defineSchema<Contact[]>("Contact.list-result", {
    type: "array",
    items: contactSchema,
} as JSONSchemaType<Contact[]>);
const detailSchema = defineSchema<Contact>("Contact.detail", contactSchema);

const contactModel: ModelDefinition<Contact> = {
    name: "Contact",
    identityField: "id",
    schemas: {
        list: listResultSchema,
        detail: detailSchema,
    },
    endpoints: {
        list: {
            api: "main",
            path: "contacts/",
            responseSchema: "Contact.list-result",
        },
        detail: {
            api: "main",
            path: "contacts/{id}/",
            responseSchema: "Contact.list",
        },
    },
};

const models = new ModelRegistry(schemas);
models.register(contactModel);

const apis: Record<string, ApiDefinition> = {
    main: { baseUrl: "https://example.test/api/" },
};
const repository = new Repository(models, schemas, new HttpTransport(apis), new MemoryStorage());

const query = repository.createQuery(contactModel, "list");
await query.execute();

// This fetch does not add the contact to query.data.
const contact = await repository.fetch(contactModel, "detail", {
    pathParams: { id: 42 },
});
```

The example is illustrative; the public API should be refined as the MVP is tested.

## Development

```sh
npm install
npm test
npm run build
```


## Relations (MVP)

Relations are declared on a model and resolved explicitly; property access never triggers HTTP.
A relation can be embedded in a response or represented by a foreign-key field. The embedded
object is preferred when present; otherwise `resolveRelation()` can use the declared target
endpoint and foreign key. Resolved objects are returned to the caller and are not inserted into
other queries or a global identity map.

```ts
const contact = await repository.fetch(contactModel, "detail", {
    pathParams: { id: 42 },
});
const organization = await repository.resolveRelation(contactModel, contact, "organization");
```

Example relation declaration:

```ts
relations: {
    organization: {
        target: "Organization",
        foreignKey: "organization_id",
        endpoint: "detail",
        idParam: "id",
        // Optional: schema name for embedded objects and related fetches.
        schema: "Organization.detail",
    },
}
```
