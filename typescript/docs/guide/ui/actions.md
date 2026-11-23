# Actions and Toolsets

## Introduction

Ox-Watt provides an action system for defining, organizing, and executing user interactions.

Actions represent operations that can be performed within an application. They can be used independently in components or organized into hierarchical toolsets to support more complex interfaces such as toolbars, context menus, navigation menus, and command palettes.

The system separates three concerns:

- **Action definitions** describe available actions independently of a particular execution context.
- **Action instances** represent contextualized actions and expose their reactive state.
- **Toolsets** organize action instances into hierarchical collections and provide a way to retrieve and execute them.

This separation makes actions reusable across components and allows applications to define their own action behaviors without coupling them to UI components.

## 1. Actions

### 1.1. Defining an action

An action is described by an `ActionDefinition`.

A definition contains the information required to identify and describe an action, its execution behavior, and optional conditions controlling its availability.

For example:

```ts
import type { ActionDefinition } from "@ox-watt/ui";

interface PageContext {
    canSave: boolean;
    documentId: number;
}

const saveAction: ActionDefinition<PageContext, void, void> = {
    name: "save",
    label: "Save",
    help: "Save the current document",

    isVisible: () => true,

    isEnabled: (context) => context.canSave,

    run: async (context) => {
        await saveDocument(context.documentId);
    },
};
```

Definitions are independent of Vue components. They can be declared in application modules and reused wherever the corresponding action is needed.

### 1.2. Action properties

An action definition can contain the following properties:

| Property | Description |
|---|---|
| `name` | Unique name identifying the action within its toolset. |
| `label` | Human-readable action label. |
| `help` | Optional descriptive text, commonly used as a tooltip. |
| `href` | Optional destination URL for a navigation action. |
| `isVisible` | Determines whether the action should be displayed. |
| `isEnabled` | Determines whether the action can be executed. |
| `isActive` | Indicates whether the action is currently active. |
| `run` | Executes the action's operation. |

The `href` property is used for navigation actions. It allows an action to represent a link without requiring the application to implement navigation logic in a custom `run` function.

For example:

```ts
const homeAction: ActionDefinition<PageContext> = {
    name: "home",
    label: "Home",
    help: "Go to the home page",
    href: "/",
};
```

Navigation is handled by the default `href` action handler. This keeps navigation behavior reusable and independent of the component rendering the action.

An action can therefore represent either an operation implemented through `run` or a navigation destination provided through `href`.

### 1.3. Action conditions

Actions can define optional conditions evaluated against their execution context.

| Property | Description | Default |
|---|---|---|
| `isVisible` | Determines whether the action should be displayed. | `true` |
| `isEnabled` | Determines whether the action can be executed. | `true` |
| `isActive` | Indicates whether the action is currently active. | `false` |

These conditions are evaluated when creating the action instance and exposed as reactive computed properties.

For example:

```ts
const deleteAction: ActionDefinition<PageContext, void, void> = {
    name: "delete",
    label: "Delete",

    isVisible: (context) => context.documentId > 0,

    isEnabled: (context) => context.canSave,

    run: async (context) => {
        await deleteDocument(context.documentId);
    },
};
```

The conditions are context-dependent. They should describe the availability of an action, rather than implement UI-specific behavior.

### 1.4. Creating an action instance

An action definition is not itself an executable contextualized action. Use `useAction` to create an `ActionInstance`.

```ts
import { useAction } from "@ox-watt/ui";

const action = useAction(
    saveAction,
    pageContext,
);
```

The context can be provided as a regular value or a Vue reactive reference.

An action instance exposes the following properties:

| Property | Description |
|---|---|
| `definition` | Original action definition. |
| `visible` | Reactive visibility state. |
| `enabled` | Reactive execution availability. |
| `active` | Reactive active state. |
| `running` | Indicates whether the action is currently executing. |
| `run(params?)` | Executes the action. |

The instance is responsible for managing execution state.

For example, an action is normally disabled while it is running. Concurrent execution can be enabled through the corresponding `useAction` option when required.

```ts
const action = useAction(
    saveAction,
    pageContext,
    {
        concurrent: false,
    },
);

await action.run();
```

The `running` state is updated during execution and reset when the operation completes, including when it fails.

## 2. Toolsets

### 2.1. What is a toolset?

A toolset is a collection of action definitions and nested toolsets.

It provides a hierarchical structure for organizing related actions.

For example, an application toolbar could be represented as follows:

```text
editor
├── save
├── undo
├── redo
└── formatting
    ├── bold
    ├── italic
    └── underline
```

This structure is useful for more than toolbars. The same toolset can be consumed by menus, command palettes, contextual actions, or other UI components.

A toolset definition is declarative:

```ts
import type { ToolsetDefinition } from "@ox-watt/ui";

const editorToolset: ToolsetDefinition<PageContext> = {
    name: "editor",
    items: [
        saveAction,
        {
            name: "formatting",
            items: [
                boldAction,
                italicAction,
                underlineAction,
            ],
        },
    ],
};
```

Toolsets can contain both actions and other toolsets. This allows applications to organize actions according to their domain or intended UI structure.

### 2.2. Creating a toolset instance

Use `useToolset` to create a contextualized toolset:

```ts
import { useToolset } from "@ox-watt/ui";

const toolset = useToolset(
    editorToolset,
    pageContext,
    {},
);
```

The toolset creates and manages instances of its children using the supplied context.

Nested toolsets inherit the same context unless a different context is explicitly introduced by the application.

A toolset instance exposes its definition, context, and collection of instantiated children.

Unlike action instances, toolsets do not automatically aggregate the `visible`, `enabled`, or `active` states of their children. These properties have no universal meaning at the toolset level. A component that needs to derive such a state should implement its own aggregation rule.

### 2.3. Retrieving actions

Use `get()` to retrieve an item by name.

```ts
const save = toolset.get("save");
```

Nested items can be retrieved using dotted paths:

```ts
const bold = toolset.get("formatting.bold");
```

Since a path can resolve to either an action or a nested toolset, the returned item must be narrowed before using action-specific properties.

```ts
import { isActionInstance } from "@ox-watt/ui";

const item = toolset.get("formatting.bold");

if (item && isActionInstance(item)) {
    await item.run();
}
```

### 2.4. Executing actions by path

For convenience, a toolset provides `run()` to execute an action identified by its path.

```ts
await toolset.run("save");

await toolset.run("formatting.bold");
```

The method resolves the requested item and verifies that it is an action before executing it.

Attempting to execute a nested toolset instead of an action results in an error.

This is particularly useful for components that work with action names rather than holding references to individual action instances.

## 3. Working with named actions

### 3.1. useNamedAction

`useNamedAction` resolves an action from an existing toolset.

```ts
import { useNamedAction } from "@ox-watt/ui";

const save = useNamedAction(
    toolset,
    "save",
);
```

It returns a computed reference to the resolved action instance.

This is useful when a component needs to react to changes in the toolset or when the action is identified by name rather than directly passed as an instance.

An optional `required` option can be used when the action must exist:

```ts
const save = useNamedAction(
    toolset,
    "save",
    {
        required: true,
    },
);
```

If the requested action cannot be found, the composable throws an error.

## 4. Using actions in Vue components

Ox-Watt provides components for rendering actions without requiring every application to implement the same interaction logic.

### 4.1. OwAction

`OwAction` renders an action instance.

```vue
<script setup lang="ts">
import { useAction } from "@ox-watt/ui";
import OwAction from "@ox-watt/ui/components/OwAction.vue";

const action = useAction(
    saveAction,
    pageContext,
);
</script>

<template>
    <OwAction :action="action" />
</template>
```

The component uses the action state to control its rendering and interaction.

For example:

- Invisible actions are not rendered.
- Disabled actions cannot be activated.
- Running actions expose their execution state.

The component also supports overriding the action label and help text:

```vue
<OwAction
    :action="action"
    label="Save changes"
    help="Save the current document"
/>
```

### 4.2. Custom rendering through slots

`OwAction` exposes action properties through its default slot.

This allows applications to customize the presentation while keeping the execution and state management provided by the action instance.

```vue
<OwAction :action="action">
    <template #default="{ label, enabled, running, run }">
        <button
            type="button"
            :disabled="!enabled"
            @click="run"
        >
            {{ running ? "Saving..." : label }}
        </button>
    </template>
</OwAction>
```

The slot can be used to build custom buttons, menu entries, toolbar controls, or other interactive elements.

### 4.3. OwNamedAction

`OwNamedAction` is a convenience component for rendering an action identified by name.

It receives a toolset instance and an action name:

```vue
<OwNamedAction
    :toolset="editorToolset"
    name="save"
/>
```

It resolves the action through `useNamedAction` and delegates rendering to `OwAction`.

It also forwards attributes and exposes the same default slot properties.

This makes it possible to use named actions without manually resolving their instances in every component.

## 5. Providing toolsets to components

Toolsets can be passed explicitly as props or exposed through Vue's dependency injection mechanism.

The toolset system does not impose a global injection key or a mandatory provider component. Applications remain responsible for choosing how toolsets are made available.

For example, an application can provide a toolset using its own injection key:

```ts
import { inject, provide, type InjectionKey } from "vue";
import type { ToolsetInstance } from "@ox-watt/ui";

const editorToolsetKey: InjectionKey<ToolsetInstance<PageContext>> =
    Symbol("editor-toolset");

provide(editorToolsetKey, editorToolset);
```

A descendant component can retrieve it:

```ts
const toolset = inject(editorToolsetKey);

if (!toolset) {
    throw new Error("Editor toolset is not available.");
}
```

The component can then pass the toolset to `OwNamedAction` or use it directly.

This approach keeps the action system independent of application-specific dependency injection conventions.

## 6. Organizing menus and navigation

Toolsets are particularly useful for building menus.

A menu is essentially a presentation of a hierarchical collection of actions. Each menu entry can refer to an action, while nested toolsets can represent submenus.

For example:

```ts
const navigationToolset: ToolsetDefinition<PageContext> = {
    name: "navigation",
    items: [
        {
            name: "home",
            label: "Home",
            help: "Go to the home page",
            href: "/",
        },
        {
            name: "documents",
            items: [
                {
                    name: "all",
                    label: "All documents",
                    href: "/documents/",
                },
                {
                    name: "recent",
                    label: "Recent documents",
                    href: "/documents/recent/",
                },
            ],
        },
    ],
};
```

Each navigation item uses the `href` property to declare its destination. The default `href` handler provides the corresponding navigation behavior.

The menu component can interpret the toolset hierarchy and render nested toolsets as submenus.

The same toolset can also be consumed by other components, such as a navigation sidebar or command palette.

The toolset itself remains unaware of the UI in which it is displayed.

## 7. Action types and execution handlers

Different kinds of actions may require different execution mechanisms.

For example:

- A link action navigates to a URL.
- A function action executes application-provided logic.
- A POST action sends an HTTP request.
- A download action retrieves a file.
- An application-specific action may trigger a custom workflow.

Rather than introducing a separate composable for every action type, the action system can use an action handler registry.

The registry associates an action type with its implementation.

Conceptually:

```text
ActionDefinition
       |
       | type
       v
Action Handler Registry
       |
       +── href handler
       |
       +── custom application handlers
```

### 7.1. Default handlers

Ox-Watt currently provides the following default action handler:

| Handler | Configuration | Behavior |
|---|---|---|
| `href` | `href` | Navigates to the specified URL. |

The `href` handler makes navigation a built-in action behavior. Applications can declare links directly in their action definitions without implementing a custom execution function.

Other behaviors, such as HTTP requests or downloads, can be implemented through additional handlers when needed.

### 7.2. Custom handlers

Applications can extend the action system by registering their own handlers.

For example, a custom handler could implement a POST request, a file download, or an application-specific operation.

The responsibilities are separated:

| Element | Responsibility |
|---|---|
| `ActionDefinition` | Declares the action and its configuration. |
| Action handler | Implements the behavior associated with an action type. |
| `useAction` | Creates the contextualized action instance and manages its state. |
| `ToolsetInstance` | Organizes and resolves action instances. |
| UI component | Presents and interacts with the action. |

This approach avoids duplicating execution-state management and common action behavior across specialized composables.

It also allows applications to register their own action types without modifying the core action system.

## 8. Recommended organization

For larger applications, it is useful to organize action definitions by feature or domain.

For example:

```text
src/
├── actions/
│   ├── document.ts
│   ├── navigation.ts
│   └── user.ts
│
├── toolsets/
│   ├── editor.ts
│   ├── navigation.ts
│   └── user.ts
│
└── components/
    ├── DocumentToolbar.vue
    ├── MainMenu.vue
    └── UserMenu.vue
```

Definitions and toolsets should remain independent of their consuming components whenever possible.

This makes them easier to reuse, test, and compose.

## Summary

The action and toolset system provides a reusable foundation for application interactions.

- **Actions** describe individual operations or navigation destinations.
- **Action instances** provide contextualized, reactive execution state.
- **Toolsets** organize actions into hierarchical collections.
- **Named actions** make it easy to retrieve actions by name.
- **Vue components** provide standard and customizable rendering.
- **Action handlers** allow different execution behaviors to coexist without coupling them to UI components.

By separating definitions, execution, organization, and presentation, Ox-Watt can support everything from simple buttons to complex navigation systems using the same underlying model.
