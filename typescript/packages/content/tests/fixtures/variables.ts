import type {
    Variable,
    VariableAction,
    VariableGroup,
} from "../../src/types/blocks";

/**
 * Variables available to the test editor.
 */
export const TestVariableGroups: VariableGroup[] = [
    {
        name: "user",
        title: "User",
        items: [
            {
                name: "firstName",
                title: "First name",
                description: "The user's first name",
                icon: "mdi-account",
            },
            {
                name: "lastName",
                title: "Last name",
            },
        ],
    },
    {
        name: "company",
        title: "Company",
        items: [
            {
                name: "name",
                title: "Company name",
            },
        ],
    },
];

/**
 * Minimal variable action used to configure block extensions.
 */
export const TestVariableAction = {
    name: "variable",
    title: "Variables",
    variables: TestVariableGroups,
    run: () => undefined,
} as unknown as VariableAction;



/**
 * Creates a reusable variable action definition for tests.
 *
 * @param name - Action name.
 * @returns Variable action definition.
 */
export function createTestVariableAction(
    name: "variable" | "ifvariable" = "variable",
): VariableAction {
    return {
        name,
        variables: TestVariableGroups,
    } as VariableAction;
}
