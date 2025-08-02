import { Task } from "@/types/types";
import { use } from "react";
import { cn } from "@/lib/utils";
import ClientTaskList from "./task-list-client";


type Props = {
  tasks: Promise<{ message: string, tasks: Task[]}>
}
export default function TaskList({ tasks }: Props) {
  const allTasks = use(tasks).tasks

  return (
    <div className={cn(
      "flex gap-4 flex-col text-white mt-20 w-full",
      "max-h-[80%] overflow-y-scroll pr-2"
    )}>
      <ClientTaskList tasks={allTasks}/>
    </div>
  )
}
