import type {
    ActionInstance,
    OwActionProps,
} from "ox-watt"
import type {
    VariableAction,
    RichTextContext
} from "../../types"


export interface OwVariableActionProps<
    TContext extends RichTextContext = RichTextContext
>
    extends OwActionProps
{
    /** The variable action instance. **/
    action: ActionInstance<VariableAction, TContext>,
}
