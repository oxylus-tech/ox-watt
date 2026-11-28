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

/**
 * Returns a variable from the shared test fixtures.
 *
 * @param groupName - Name of the variable group.
 * @param variableName - Name of the variable.
 * @returns The matching variable.
 */
export function getTestVariable(
    groupName: string,
    variableName: string,
): Variable {
    const group = TestVariableGroups.find(
        (item) => item.name === groupName,
    );

    const variable = group?.items.find(
        (item) => item.name === variableName,
    );

    if (!variable) {
        throw new Error(
            `Unknown test variable "${groupName}.${variableName}".`,
        );
    }

    return variable;
}
