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
    extends Variable, NamedGroupDefinition<Variable>
{
}

/**
 * An action that will insert a block in the edited content.
 */
export type BlockAction<
    TContext extends RichTextContext=RichTextContext,
    TParams = void,
    TResult = unknown
> = Action<TContext, TParams, TResult> & {
    inline?: boolean
}

/**
 * Parameters of a variable action.
 */
export interface VariableActionParam {
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
    variables: Variable[]
}
