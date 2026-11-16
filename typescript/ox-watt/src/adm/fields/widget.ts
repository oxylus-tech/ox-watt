import type { Component } from "vue";
import type { Field } from './field';

/**
 * Defines a widget configuration.
 */
export interface WidgetConfig {
    /** Vue component or registered widget name. */
    component: string | Component;

    /** Props passed to the widget component. */
    props?: Record<string, unknown>;

    /** Map properties into widget's ones. */
    bind?: (field: Field, props: Record<string, unknown>) => Record<string, unknown>;
}

/**
 * Defines a field widget.
 *
 * A widget can be a registered name, a Vue component, or a component
 * configuration containing additional props.
 */
export type Widget = string | Component | WidgetConfig;
