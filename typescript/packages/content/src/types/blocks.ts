import type {
    Action,
    Toolset,
    NamedDefinition,
    NamedGroupDefinition
} from "ox-watt"
import type { RichTextContext } from "./editor"


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
    TContext extends RichTextContext=RichTextContext,
    TParams = void,
    TResult = unknown
> = Action<TContext, TParams, TResult>

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
    TContext extends RichTextContext=RichTextContext,
    TParams extends VariableActionParam = VariableActionParam,
    TResult = unknown
> = BlockAction<TContext, TParams, TResult> & {
    variables: VariableGroup[]
}

/**
 * An action that inserts a conditional variable block.
 */
export type IfVariableAction<
    TContext extends RichTextContext = RichTextContext,
    TParams extends VariableActionParam = VariableActionParam,
    TResult = unknown
> = VariableAction<TContext, TParams, TResult>;
