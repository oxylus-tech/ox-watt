---
order: 37
---
# Rendering model fields and forms

The previous chapter explained how to define fields, associate validation rules with them, and configure widgets through the `adm` widget registry.

This chapter builds on those concepts and explains how to use these definitions in Vue components.

Ox-Watt provides two components for rendering model fields:

- `OwField` renders an individual field using its definition and resolved widget.
- `OwModelFields` renders multiple fields from a model instance, optionally organizing them into fieldsets.

Both components rely on the field and widget definitions described in the previous chapter. You generally do not need to configure a widget or redefine its default validation rules every time you render a field.

## Rendering an individual field

Use `OwField` when you need to render a single field or build a custom form layout.

The component requires a field definition and accepts the current value through `modelValue`.

```vue
<OwField
    :field="emailField"
    v-model="model.email"
/>
```

The component resolves the widget associated with the field and renders it with the appropriate properties.

If the field defines default validation rules or a widget, these are automatically taken into account.

### Overriding the widget

A field's default widget can be overridden for a particular use case using the `widget` prop.

```vue
<OwField
    :field="emailField"
    :widget="customWidget"
    v-model="model.email"
/>
```

The explicitly provided widget takes precedence over the widget defined on the field.

This is useful when a field has a sensible default presentation but needs a different widget in a particular form.

### Providing additional widget properties

Properties not explicitly declared by `OwField` are forwarded to the resolved widget.

```vue
<OwField
    :field="countryField"
    v-model="model.country"
    density="compact"
    clearable
/>
```

You can also provide `items` for selection widgets:

```vue
<OwField
    :field="countryField"
    v-model="model.country"
    :items="countries"
/>
```

The actual properties supported depend on the resolved widget.

### Customizing labels and help text

`OwField` accepts `label` and `help` properties to customize the text displayed by the widget.

```vue
<OwField
    :field="emailField"
    v-model="model.email"
    label="Work email"
    help="Use your professional email address."
/>
```

If these properties are omitted, their presentation depends on the widget configuration.

### Required, disabled and read-only states

`OwField` derives its default state from the field definition:

- `required` defaults to `field.required`.
- `readonly` defaults to `field.readOnly`.
- `disabled` defaults to `false`.

Each state can be overridden explicitly:

```vue
<OwField
    :field="emailField"
    v-model="model.email"
    :required="false"
    :disabled="isSubmitting"
    :readonly="isReadOnly"
/>
```

This allows a view to adapt the behavior of a field without changing its underlying definition.

## Using validation rules

As explained in the previous chapter, validation rules can be defined on the `Field` class or instance, and additional rules can be provided by the view.

`OwField` automatically retrieves the rules defined by the field and combines them with the rules passed through its `rules` prop.

For example, a form can add a constraint that is only relevant in its own context:

```vue
<script setup lang="ts">
/**
 * Validates that a value belongs to the current organization.
 *
 * @param value Value to validate.
 * @returns True when valid, otherwise an error message.
 */
function organizationRule(value: unknown): true | string {
    return allowedOrganizations.includes(value as string)
        ? true
        : 'Select an organization you have access to.';
}
</script>

<template>
    <OwField
        :field="organizationField"
        v-model="model.organization"
        :rules="[organizationRule]"
    />
</template>
```

The additional rules do not replace the rules defined by the field. They extend them.

The rules are forwarded to the widget, which is responsible for executing them according to its validation implementation.

### Displaying validation errors

Validation errors can also be passed explicitly through the `errors` property.

```vue
<OwField
    :field="emailField"
    v-model="model.email"
    :errors="['This email address is already registered.']"
/>
```

The property accepts an array of strings or `ValidationIssue` objects. Issues are converted to their message before being passed to the widget.

When the error list is not empty, `OwField` also sets `aria-invalid` to `true` on the widget.

This is useful when validation is performed outside the widget, for example by an API after submitting a form.

## Rendering a model form

When you need to render several fields belonging to a model, use `OwModelFields`.

Instead of resolving each field and binding its value manually, the component takes care of retrieving field definitions and synchronizing values with the model instance.

```vue
<OwModelFields
    :model="user"
    :fields="[
        'firstName',
        'lastName',
        'email'
    ]"
/>
```

The `model` property receives a model instance, while `fields` defines which fields should be rendered and in which order.

Each field name is resolved against the model class. An unknown field causes an error, making incorrect layouts easier to identify.

### Organizing fields into fieldsets

Fields can be grouped into fieldsets by providing a `FieldSet` configuration.

A fieldset contains a title and an ordered list of fields.

```vue
<OwModelFields
    :model="user"
    :fields="[
        {
            title: 'Personal information',
            fields: [
                'firstName',
                'lastName'
            ]
        },
        {
            title: 'Contact information',
            fields: [
                'email',
                'phone'
            ]
        }
    ]"
/>
```

Fieldsets are rendered using native HTML `fieldset` and `legend` elements.

You can combine individual fields and fieldsets in the same layout.

### Configuring individual fields

A field can be configured using a `FieldConfig` object instead of a plain string.

The configuration contains:

- `name`: the name of the model field.
- `props`: additional properties forwarded to `OwField`.

This lets you customize a field without changing its model definition.

```vue
<OwModelFields
    :model="user"
    :fields="[
        'firstName',
        {
            name: 'email',
            props: {
                label: 'Professional email',
                help: 'Use your work email address.',
                rules: [organizationRule]
            }
        }
    ]"
/>
```

The same configuration can be used inside a fieldset:

```vue
<OwModelFields
    :model="user"
    :fields="[
        {
            title: 'Account',
            fields: [
                'username',
                {
                    name: 'email',
                    props: {
                        label: 'Contact email',
                        rules: [organizationRule]
                    }
                }
            ]
        }
    ]"
/>
```

Properties provided through `FieldConfig.props` override the default properties generated by `OwModelFields`, such as the label, help text, errors, disabled state and read-only state.

The field definition, field name and current model value remain controlled by `OwModelFields`.

## Applying common field states

`OwModelFields` provides `disabled` and `readonly` properties to apply a common state to every rendered field.

```vue
<OwModelFields
    :model="user"
    :fields="fields"
    :disabled="isSubmitting"
    :readonly="isReadOnly"
/>
```

These values are forwarded to each `OwField`.

A specific field can override either value through its `FieldConfig.props`.

## Displaying validation errors

The `errors` property of `OwModelFields` accepts a record indexed by field name.

```vue
<OwModelFields
    :model="user"
    :fields="fields"
    :errors="{
        email: ['This email address is already registered.'],
        username: ['This username is unavailable.']
    }"
/>
```

Each field receives the error list associated with its name. Fields without an entry receive an empty list.

This structure is particularly useful when mapping validation errors returned by an API to the corresponding model fields.

## Model synchronization

`OwModelFields` uses the model instance as the source of truth for field values.

When rendering a field, it reads the current value from the corresponding model property and passes it to `OwField`.

When a widget emits `update:modelValue`, `OwModelFields` writes the new value directly to the model instance.

Consequently, changes made in the form are reflected in the model without requiring a separate update event from `OwModelFields`.

Make sure the model instance is reactive when you expect the form to update in response to changes made elsewhere in the application.

## Choosing the right component

The two components address different levels of form composition:

| Component | Use it when |
| --- | --- |
| `OwField` | You need to render and control an individual field. |
| `OwModelFields` | You want to render a collection of model fields with automatic value synchronization. |

In both cases, the field definition remains the source of reusable validation and widget defaults.

Use component properties and field configurations to adapt those defaults to the needs of a particular view, rather than duplicating field definitions.

