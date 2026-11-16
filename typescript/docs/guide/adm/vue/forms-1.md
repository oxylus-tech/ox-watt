---
order: 36
---

# Defining Field rules and widgets

Fields in `adm` describe not only the data they represent, but also their validation behavior and, optionally, their default presentation.

This section explains how to define reusable validation rules, associate widgets with fields, and register the components used to render them.

## Defining validation rules

Validation rules are functions that receive a field value and return either `true` when the value is valid or an error message when it is not.

```ts
import type { ValidationRule } from '@/adm/models.types';

/**
 * Validates that a value is not empty.
 *
 * @param value Value to validate.
 * @returns True when valid, otherwise an error message.
 */
const requiredRule: ValidationRule = (value) => {
    return value !== null && value !== undefined && value !== ''
        ? true
        : 'This field is required.';
};

/**
 * Validates an email address.
 *
 * @param value Value to validate.
 * @returns True when valid, otherwise an error message.
 */
const emailRule: ValidationRule = (value) => {
    if (typeof value !== 'string') {
        return 'Enter a valid email address.';
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? true
        : 'Enter a valid email address.';
};
```

### Class-level rules

Rules can be declared on a `Field` class. Static rules are inherited, so a specialized field can extend the validation behavior of its parent without having to redefine the existing rules.

This is useful for defining reusable field types with consistent validation behavior.

For example, a required string field can provide a common rule that is inherited by more specialized string fields.

### Instance-level rules

A field instance can also define additional rules.

This is useful when validation depends on the particular field declaration rather than on its general type.

The rules exposed by a field combine its inherited class-level rules and its instance-level rules.

Consequently, `OwField` does not need to know where a rule was declared: it retrieves the field rules and combines them with any additional rules supplied through its `rules` prop.

### Adding rules when rendering a field

The `rules` prop of `OwField` allows a view to add context-specific validation without modifying the field definition.

```vue
<OwField
    :field="emailField"
    v-model="model.email"
    :rules="[emailRule]"
/>
```

The resulting rules consist of:

1. Rules declared on the field class, including inherited rules.
2. Rules declared on the field instance.
3. Additional rules passed to `OwField`.

This keeps reusable validation close to the field definition while allowing individual forms to add their own constraints.

### Validation in Specs

`Spec` also supports validation rules, but its behavior is intentionally different from `Field`.

A `Spec` uses class-level rules only. These rules validate the specification as a whole, whereas field rules validate individual field values.

This distinction allows shared validation logic without conflating model-level and field-level validation.

## Associating widgets with fields

A field can declare a default widget. This describes how the field should be rendered without making the field definition dependent on a particular UI framework.

Widgets are resolved through the `adm` widget registry.

The registry is independent of Vuetify: it knows how to associate widget identifiers with Vue components, but does not require Vuetify components to be registered globally.

### Widget definitions

The widget API supports three forms:

- A string identifier referencing a registered widget.
- A `WidgetConfig` object defining a component and optional configuration.
- A Vue component directly.

A widget configuration can provide:

- `component`: the Vue component used to render the field.
- `props`: default properties passed to that component.
- `bind`: an optional function that maps field information and generated properties to the component's properties.

The `bind` function is useful when a widget expects a different property structure from the generic field interface.

For example, a widget may need to derive a component-specific property from the field definition.

### Registering widgets

Widget identifiers are resolved through the widget registry. This allows field definitions to refer to widgets by name without importing their Vue components directly.

The core registry remains framework-independent. UI-framework-specific widgets are registered separately.

For Vuetify, the available widget definitions are provided by `widgetsVuetify.ts`. Import this module once in the application to register the Vuetify widgets.

The provided identifiers include:

- `text`
- `textarea`
- `autocomplete`
- `select`
- `checkbox`
- `switch`

Applications can also register their own widgets, including widgets that are not based on Vuetify.

### Choosing a widget on a Field

A field can reference a widget identifier or provide a widget configuration directly.

This makes it possible to define a default presentation alongside the field's data and validation behavior.

The widget can still be overridden when using `OwField`:

```vue
<OwField
    :field="field"
    :widget="customWidget"
    v-model="value"
/>
```

An explicit `widget` prop takes precedence over the widget declared by the field.

### Widget properties and binding

A widget configuration can provide default component properties through `props`.

`OwField` then builds the properties passed to the component using the widget configuration, field information, component props and attributes supplied by the caller.

If the widget defines a `bind` function, it receives the field and the generated properties. Its return value is used as the final set of widget properties.

This provides a clean separation between generic field behavior and the requirements of a particular UI component.

For example, the same field definition can be rendered by different widgets, while each widget adapts the field information to its own component API.

## Choosing where to define behavior

As a general guideline:

| Requirement | Where to define it |
| --- | --- |
| Validation shared by all fields of a type | Static rules on the Field class |
| Validation specific to one field declaration | Instance rules |
| Validation specific to one form or view | `OwField`'s `rules` prop |
| Default presentation of a field | Field widget configuration |
| Reusable component implementation | Widget registry |
| Presentation specific to one usage | `OwField`'s `widget` prop |

This approach keeps field definitions reusable and independent of the UI framework, while allowing applications and individual views to customize their presentation and validation behavior.
