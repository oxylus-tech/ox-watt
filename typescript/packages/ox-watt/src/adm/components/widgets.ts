import type { Component } from "vue";
import { KeyedStore } from "../../utils/store";

import type { Widget, WidgetConfig } from "../fields/widget";


export interface ResolvedWidget extends WidgetConfig {
    /** Vue component implementing the widget. */
    component: Component;
}


/**
 * Represents a registered widget.
 */
export interface WidgetEntry extends ResolvedWidget {
    /** Unique widget name. */
    name: string;
}

/**
 * Store containing the available widgets.
 */
export const widgetStore = new KeyedStore<string, WidgetEntry>(null, "name");


/**
 * Resolves a widget definition into a Vue component.
 *
 * @param widget Widget definition to resolve.
 * @returns The resolved widget configuration, or undefined when unavailable.
 */
export function resolveWidget(widget?: Widget): ResolvedWidget | undefined {
    if (!widget)
        return undefined;

    if (typeof widget === "string")
        return widgetStore.get(widget);

    if (typeof widget === "object" && "component" in widget) {
        const component = (widget as WidgetConfig).component;

        return typeof component === "string"
            ? widgetStore.get(component)
            : {component};
    }

    return {component: widget as Component};
}
