import { inject, provide, type InjectionKey } from "vue";

import type { VariableGroup } from "../types/actions";

/**
 * Injection key for the variable catalogue.
 */
const variablesKey: InjectionKey<VariableGroup[]> = Symbol("ox-content:variables");

/**
 * Provides the variable catalogue to descendant components.
 *
 * The catalogue is considered static after initialization.
 *
 * @param variables - Available variable groups.
 */
export function provideVariables(variables: VariableGroup[]): void {
    provide(variablesKey, variables);
}

/**
 * Injects the variable catalogue if one has been provided.
 *
 * @returns The variable catalogue, or undefined if no provider exists.
 */
export function injectVariables(): VariableGroup[] | undefined {
    return inject(variablesKey, undefined);
}

/**
 * Injects the variable catalogue and throws if no provider exists.
 *
 * @returns The variable catalogue.
 * @throws If no variable catalogue has been provided.
 */
export function useVariables(): VariableGroup[] {
    const variables = injectVariables();

    if (!variables) {
        throw new Error(
            "No variable catalogue provided. Make sure the component is inside an OwVariableToolset."
        );
    }

    return variables;
}
