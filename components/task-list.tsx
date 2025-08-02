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
    <div className={cn("flex max-h-[80%] gap-4 flex-col text-white mt-20 w-full")}>
      <ClientTaskList tasks={allTasks}/>
    </div>
  )
}
