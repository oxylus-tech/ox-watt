---
order: 33
---
# Editors

ADM provides editor composables to manage editable data independently from
the source object.

An editor maintains a reactive copy of the data being edited. This allows
components to modify values without immediately changing the original model.

Three composables are available:

- `useEditor()` for arbitrary objects.
- `useModelEditor()` for ADM models.
- `useApiModelEditor()` for ADM models persisted through an API client.

## Generic editor

`useEditor()` can edit any object. The fields managed by the editor must be
specified explicitly.

```ts
import { useEditor } from '@oxylus/ox-watt';

const profile = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
};

const editor = useEditor(profile, {
    fields: ['firstName', 'lastName', 'email'],
});
```

The editor exposes the following properties:

| Property | Description |
| --- | --- |
| `data` | Reactive editable data |
| `original` | Initial data snapshot |
| `isDirty` | Whether managed fields differ from the initial snapshot |
| `isSaving` | Whether a save operation is running |
| `errors` | Current validation errors |

The editor also exposes the following methods:

| Method | Description |
| --- | --- |
| `setSource(source)` | Replaces the source and resets the editor |
| `reset()` | Restores the initial values |
| `save()` | Saves the current data |
| `setErrors(errors, data?)` | Sets validation errors |
| `clearErrors(field?)` | Clears all errors or errors for one field |

### Editing and resetting

```ts
editor.data.firstName = 'Augusta';

if (editor.isDirty) {
    editor.reset();
}
```

The editor tracks only the fields listed in its `fields` option.

By default, the selected fields are deep-copied. The source object is not
modified while the user edits the form.

### Saving

Without a custom `save` callback, saving copies the edited fields back to
the source object.

```ts
await editor.save();
```

A custom `save` callback can implement another persistence strategy:

```ts
const editor = useEditor(profile, {
    fields: ['firstName', 'lastName', 'email'],

    async save(data, source, context) {
        await profileApi.update(data);

        context.defaultSave();
    },
});
```

When a custom callback is provided, it is responsible for synchronizing the
source object. Calling `context.defaultSave()` applies the standard
synchronization.

The callback can also provide a custom synchronization function:

```ts
const editor = useEditor(profile, {
    fields: ['firstName', 'lastName', 'email'],

    async save(data, source, context) {
        const saved = await profileApi.update(data);

        context.defaultSave(() => {
            Object.assign(source, saved);
        });
    },
});
```

### Errors and callbacks

Editor errors have two possible forms:

```ts
editor.setErrors({
    fields: {
        email: ['This email address is already in use.'],
    },
    global: ['The profile could not be saved.'],
});
```

Field errors are associated with the data snapshot. Changing a field clears
its corresponding errors. Global errors remain until explicitly cleared or
the editor is reset.

The following callbacks are available:

| Callback | Description |
| --- | --- |
| `onSave(result, data)` | Called after a successful save |
| `onReset(data)` | Called after resetting the editor |
| `onError(error, context)` | Called when saving fails |
| `onChange(data)` | Called when editable data changes |

Errors raised by a save operation are rethrown after the editor has updated
its error state and invoked `onError`.

## Model editor

`useModelEditor()` adapts the generic editor to an ADM model.

It derives the editable fields from the model class, uses the model's copy
method and preserves model instances during editing.

```ts
import { useModelEditor } from '@oxylus/ox-watt';

const editor = useModelEditor(
    repositories.articles.repository,
    article,
);
```

The repository is the raw repository instance, available through the
reactive repository's `repository` property.

### Creating a new model

Passing `null` creates a new model initialized with the model class defaults:

```ts
const editor = useModelEditor(
    repositories.articles.repository,
    null,
);
```

The editor can also switch between existing and new models:

```ts
editor.setSource(anotherArticle);
editor.setSource(null);
```

### Saving

Without a custom `save` callback, `useModelEditor()` synchronizes the source
model with the edited model when `save()` succeeds.

A custom callback can implement persistence and invoke `defaultSave()` when
the source model should be synchronized:

```ts
const editor = useModelEditor(
    repositories.articles.repository,
    article,
    {
        async save(data, source, context) {
            await saveArticle(data);

            context.defaultSave();
        },
    },
);
```

## API model editor

`useApiModelEditor()` combines `useModelEditor()` with the repository's API
client.

It automatically chooses between creating and updating a model:

- If the model has no identifier, it calls the API create operation.
- If the model has an identifier, it calls the API update operation.

```ts
import { useApiModelEditor } from '@oxylus/ox-watt';

const editor = useApiModelEditor(
    repositories.articles.repository,
    article,
);
```

For a new model, pass `null`:

```ts
const editor = useApiModelEditor(
    repositories.articles.repository,
    null,
);
```

The editor exposes the API client through its `api` property.

### API options

API options can be passed through the `api` property:

```ts
const editor = useApiModelEditor(
    repositories.articles.repository,
    article,
    {
        api: {
            // API operation options
        },
    },
);
```

### Mapping API errors

Use `parseErrors` to convert API or transport errors into the editor's
normalized error structure.

```ts
const editor = useApiModelEditor(
    repositories.articles.repository,
    article,
    {
        parseErrors(error) {
            if (!isApiValidationError(error)) {
                return undefined;
            }

            return {
                fields: error.fields,
                global: error.messages,
            };
        },
    },
);
```

The normalized error structure is:

```ts
interface EditorErrors {
    fields?: Record<string, string[]>;
    global?: string[];
}
```

When an API operation fails, the editor stores the mapped errors and invokes
the configured `onError` callback.

### Successful API responses

When the API returns a model, the editor synchronizes itself with that
model. If no model is returned, it keeps the submitted data.

The `onSave` callback is invoked after a successful operation:

```ts
const editor = useApiModelEditor(
    repositories.articles.repository,
    article,
    {
        onSave(result, data) {
            console.log('Article saved', data);
        },
    },
);
```

The `onSave` and `onError` callbacks can be used alongside the other model
editor callbacks, such as `onChange` and `onReset`.

