import { ConfirmDialog } from "./confirm-dialog";
import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { Checkbox } from "./ui/checkbox";
import { Trash2Icon } from "lucide-react";
import { checkboxAction } from "@/actions/checkbox-action";
import { useOptimistic, useTransition } from "react";
import { deleteTask } from "@/actions/delete-task";

type Props = {
  task: Task
  updateOptimisticTasks: (action: {action: string, task: Task})=> void
}
export default function TaskCard({ task, updateOptimisticTasks }: Props) {
  const [ optimisticStatus, updateOptimisticStatus ] = useOptimistic(
    task.completed,
    (_, newStatus:boolean) => newStatus
  )
  const [_,startTransition ] = useTransition()

  function handleCheckbox() {
    startTransition(()=>updateOptimisticStatus(!optimisticStatus))
    checkboxAction({
      newStatus: !optimisticStatus,
      id: task.id
    })
  }
  function handleDelete() {
    startTransition(()=>updateOptimisticTasks({
      action: 'delete',
      task: task
    }))
    deleteTask(task.id)
  }

  return (
    <div
      className={cn(
        " text-[#f2f2f2] bg-[#262626]",
        "border-[#333333] border",
        "rounded-lg gap-4 h-fit flex flex-row p-4 justify-between",
      )}
    >
      <div className="p-[1px]">
        <Checkbox 
          onClick={handleCheckbox}
          className={cn(
            "h-[18px] w-[18px] border-[#1E6F9F] border text-[#1e6f9f]",
            "rounded-full border-2",
            "hover:cursor-pointer",
            optimisticStatus && "bg-[#333333]"
          )}
          checked={optimisticStatus}
        />
      </div>
      <h1 className={cn(
        "flex w-full items-start",
        "text-[16px] font-normal text-[#f2f2f2]",
        "break-all whitespace-pre-wrap",
        "[overflow-wrap:anywhere]",
        { "line-through text-[#808080]": optimisticStatus}
      )}>
        {task.title}
      </h1>
      <div className={cn(
        "h-5 w-5 aspect-square rounded-full",
        { [task.color as string]: task.color }
      )}/>
      <ConfirmDialog
        title="Confirm deletion"
        description={`Are you sure you want to delete the task "${task.title}"?`}
        action={handleDelete}
      >
        <Trash2Icon
          className={cn(
            "text-[#808080] hover:cursor-pointer hover:text-red-400 transition-all",
            "w-5"
          )}
          width={16}
        />
      </ConfirmDialog>
    </div>
  )
}
