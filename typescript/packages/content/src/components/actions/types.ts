import type {
    ActionInstance,
    OwActionProps,
} from "ox-watt"
import type {
    VariableAction,
    VariableGroup,
    RichTextContext
} from "../../types"


export interface OwVariableActionProps<
    TAction extends VariableAction = VariableAction
>
    extends OwActionProps<RichTextContext, TAction>
{
    /** Variables **/
    variables?: VariableGroup[]
}
