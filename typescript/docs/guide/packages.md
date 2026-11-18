---
order: 200
---

# Packages

Packages are the building blocks used to organize and initialize an Ox-Watt application.

A package represents a functional unit of an application or library. It can provide configuration, translations, and Vue components, while remaining independent from the application that consumes it.

Packages allow an application to be assembled from reusable parts instead of requiring every feature to be implemented and initialized directly by the application.

## Why packages?

An application is rarely a single, self-contained piece of software. It usually combines several functional areas, shared components, and reusable libraries.

Packages provide a way to organize these elements into independent units.

Typical use cases include:

- **Application packages:** define the configuration and resources of an application.
- **Feature packages:** provide a specific functional area, such as contacts, accounting, or document management.
- **UI packages:** expose reusable Vue components.
- **Shared packages:** provide common resources used by several applications.
- **Extension packages:** add functionality to an existing application without modifying its original code.

A package can be developed independently, published as an npm package, and reused in multiple applications.


## Package lifecycle

Ox-Watt exposes a package initialization mechanism through the `ow` runtime.

The runtime is responsible for initializing the global services required by an application and registering packages.

The typical application startup sequence is:

1. Initialize the Ox-Watt runtime.
2. Register the application package.
3. Create and configure the Vue application.
4. Mount the application.

The package of the current project is accessible through the virtual module `ox-watt:package` (using the Vite plugin).

A package is registered using `ow.use()`:

```ts
import { ow } from 'ox-watt';
import pkg from 'ox-watt:package';

// MUST be called before any use()
await ow.initialize();

await ow.use(pkg);
```

Initialization is asynchronous. Always await it before using resources that the package provides.

Package initialization is designed to be idempotent: registering the same package more than once should not initialize it repeatedly. Concurrent requests for the same package should also share the same initialization process.

This allows different parts of an application to request package initialization without having to coordinate their execution manually.

### Runtime initialization

`ow.initialize()` is the entry point for initializing Ox-Watt's global services.

This includes services such as internationalization, which must be ready before packages register their translation resources.

This distinction makes it possible to initialize global services once while allowing packages to be loaded independently, including after the application has started.

```ts
import { createApp } from 'vue';
import { ow } from 'ox-watt';
import App from './App.vue';
import appPackage from 'ox-watt:package';
import contactsPackage from '@acme/contacts/package';

async function bootstrap() {
    await ow.initialize({
        i18n: {
            fallbackLocale: 'en',
        },
        
        packages: [
            appPackage,
            contactsPackage,
        ],
    });

    createApp(App).mount('#app');
}

await bootstrap();

// optionally, you still can call ow.use() to register new packages after init.
```

## Creating a package

A package follows a conventional source layout:

```text
my-package/
├── package.json
├── vite.config.ts
└── src/
    ├── package.ts
    ├── locales/
    │   ├── en.json
    │   └── fr.json
    └── components/
        ├── sfc.json
        ├── MyButton.vue
        └── MyInput.vue
```

Not every directory is required. A package can provide only configuration, translations, components, or any combination of these.

### Package configuration

The package configuration is defined in `src/package.ts`:

```ts
export default {
    // Package-specific configuration.
};
```

The Vite plugin discovers this file automatically.

The package name is obtained from the package's `package.json`, so it does not need to be declared manually in `package.ts`.

The configuration can also provide explicit locale loaders. These take precedence over automatically discovered locale files with the same filename.

### Package metadata and generated entry point

The Ox-Watt Vite plugin generates a package entry point during the build.

It produces:

- `package.js`: the generated package module.
- `package.d.ts`: the corresponding TypeScript declaration.

The generated module combines the package configuration with the resources discovered by the plugin.

This means that package authors can keep their configuration and resources in their normal source directories without manually maintaining a generated entry point.

## The Ox-Watt Vite plugin

The Vite plugin is responsible for discovering package resources and generating the modules needed at runtime.


### Setup

You will have to add an entry point to the exports of your `package.json`:

```json
    "exports": {
        ".": "./dist/my-package.js",
        "./package": {
            "types": "./dist/package.d.ts",
            "import": "./dist/package.js"
        }
    },
```

This ensures the `package.js` module is accessible to other projects.


### Using the shared Vite configuration

Ox-Watt provides a shared Vite configuration through `ox-watt/vite.config.base`.

This configuration already includes the Ox-Watt Vite plugin, along with the standard Vue and Vuetify integration.

For a project that follows the standard Ox-Watt setup, use the shared configuration directly:

```ts
import baseConfig from 'ox-watt/vite.config.base';

export default baseConfig;
```

There is no need to register `oxWatt()` again when using this configuration.

### Configuring the plugin directly

When a project requires a custom Vite configuration, the plugin can also be registered explicitly:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { oxWatt } from 'ox-watt/vite-plugin';

export default defineConfig({
    plugins: [
        vue(),
        oxWatt(),
    ],
});
```

The plugin reads the package name from the root `package.json` and uses the source directory to discover package configuration, translations, and optionally Vue components.

### Plugin options

All paths are relative to the package root unless otherwise specified.

| Option | Default | Description |
| --- | --- | --- |
| `sourceDir` | `src` | Package source directory. |
| `localesDir` | `locales` | Directory containing JSON locale files, relative to `sourceDir`. |
| `package` | `package` | Package configuration source file, relative to `sourceDir`. Set to `false` to disable it. |
| `sfc` | `false` | Enable SFC generation or specify a custom catalogue path, relative to `sourceDir`. |
| `componentsDir` | `components` | Components directory, used for the default SFC catalogue and generated component chunks. |

For example, a package using a different source layout can configure the plugin as follows:

```ts
oxWatt({
    sourceDir: 'frontend',
    localesDir: 'translations',
    package: 'config',
    sfc: true,
});
```

The plugin will then look for:

```text
frontend/
├── config.ts
├── translations/
└── components/
    └── sfc.json
```

Setting `package: false` disables automatic discovery of the package configuration file. The plugin still generates the package entry point, using the automatically discovered package name and resources.

## Translations

JSON files directly inside the configured locale directory are discovered automatically.

For example:

```text
src/
└── locales/
    ├── en.json
    └── fr.json
    └── foo.en.json
```

The plugin generates lazy loaders for these files. Their filenames are used as locale resource keys.

The generated loaders are merged with the loaders defined manually in `package.ts`. Manually defined entries take precedence when a key is present in both sources.

This allows a package to use automatic locale discovery for its standard translations while retaining control over specific resources.

For more information about translation files, locale detection, loading, and Vue I18n integration, see the [Internationalization guide](/guide/i18n).

## Vue components

A package can also expose Vue components through an SFC catalogue.

Enable SFC generation in the plugin:

```ts
oxWatt({
    sfc: true,
});
```

By default, the plugin reads `src/components/sfc.json`.

The catalogue maps public component names to Vue component paths:

```json
{
    "MyButton": "./MyButton.vue",
    "Input": "./MyInput.vue"
}
```

Paths are relative to the catalogue file.

The plugin generates:

- `sfc.js`: an entry point exporting all declared components.
- One wrapper module for each component.

The generated entry point can be imported using the virtual module identifier:

```ts
import { MyButton, Input } from 'ox-watt:sfc';
```

### Component initialization

Generated component wrappers initialize their package before invoking the original component's `setup()` function.

Conceptually, the wrapper behaves as follows:

```ts
const component = {
    ...OriginalComponent,

    async setup(props, context) {
        await ow.use(pkg);

        return OriginalComponent.setup?.(props, context);
    },
};
```

This ensures that package initialization has completed before the component's setup logic executes.

Consequently, a component can ensure that its package is initialized without requiring the application to know about every package it uses.

### Custom SFC catalogue

A custom catalogue path can be specified when the default location does not fit the package layout:

```ts
oxWatt({
    sfc: 'ui/components.json',
});
```

The path is relative to `sourceDir`.

This is useful when a package has multiple
