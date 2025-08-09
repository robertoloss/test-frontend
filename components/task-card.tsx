import { ConfirmDialog } from "./confirm-dialog";
import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { Checkbox } from "./ui/checkbox";
import { Trash2Icon } from "lucide-react";
import { checkboxAction } from "@/actions/checkbox-action";
import { useTransition } from "react";
import { deleteTask } from "@/actions/delete-task";
import { UpdateOptimisticTasks } from "@/app/task-client-container";

type Props = {
  task: Task
  updateOptimisticTasks: UpdateOptimisticTasks 
}
export default function TaskCard({ task, updateOptimisticTasks }: Props) {
  const [_,startTransition ] = useTransition()

  function handleCheckbox() {
    const newStatus = !task.completed
    startTransition(()=>updateOptimisticTasks({
      action: 'check',
      task: {
        ...task,
        completed: newStatus
      }
    }))
    checkboxAction({
      newStatus: newStatus,
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
        "rounded-lg gap-4 h-fit flex flex-row p-4 justify-between w-full",
      )}
    >
      <Checkbox 
        onClick={handleCheckbox}
        className={cn(
          "h-[18px] w-[18px] border-[#1E6F9F] text-[#1e6f9f]",
          "rounded-full p-0",
          !task.completed && "border-2",
          "hover:cursor-pointer",
          "flex justify-center items-center",
          task.completed && "bg-[#333333]",
        )}
        checked={task.completed}
      />
      <h1 className={cn(
        "flex w-full items-start",
        "text-[16px] font-normal text-[#f2f2f2]",
        "break-all whitespace-pre-wrap",
        "[overflow-wrap:anywhere]",
        { "line-through text-[#808080]": task.completed}
      )}>
        {task.title}
      </h1>
      <div className={cn(
        "flex self-center h-5 w-5 aspect-square rounded-full",
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
