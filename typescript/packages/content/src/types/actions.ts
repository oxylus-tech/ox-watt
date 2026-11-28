import type {
    Toolset,
    NamedDefinition,
    NamedGroupDefinition
} from "ox-watt"
import type { RichTextContext, EditorAction } from "./editor"


/**
 * Define a variable and related information.
 */
export interface Variable extends NamedDefinition {
}

/**
 * A group of variables.
 */
export interface VariableGroup
    extends NamedGroupDefinition<Variable>
{
}

/**
 * An action that will insert a block in the edited content.
 */
export type BlockAction<
    TParams = void,
    TResult = unknown
> = EditorAction<TParams, TResult>

export type AnyBlockAction = BlockAction<any, any>

/**
 * Parameters of a variable action.
 */
export interface VariableActionParam {
    group: string;
    variable: Variable;
}

/**
 * A block action that insert/manipulate a related variable.
 */
export type VariableAction<
    TParams extends VariableActionParam = VariableActionParam,
    TResult = unknown
> = BlockAction<TParams, TResult>

export type AnyVariableAction = BlockAction<VariableActionParam, any>

/**
 * An action that inserts a conditional variable block.
 */
export type IfVariableAction<
    TParams extends VariableActionParam = VariableActionParam,
    TResult = unknown
> = VariableAction<TParams, TResult>;
