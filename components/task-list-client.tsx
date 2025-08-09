import { Task } from "@/types/types";
import NoTasks from "./no-tasks";
import TaskCard from "./task-card";
import { cn } from "@/lib/utils";
import TaskListHeader from "./task-list-header";
import { UpdateOptimisticTasks } from "@/app/task-client-container";

type Props = {
  tasks: Task[]
  updateOptimisticTasks: UpdateOptimisticTasks
}
export default function ClientTaskList({ tasks, updateOptimisticTasks }: Props) {

  return (
    <div className="flex max-h-[80%] gap-4 flex-col text-white mt-20 w-full">
      <TaskListHeader tasks={tasks}/>
      <div className={cn(
        "flex gap-4 flex-col w-full",
        "overflow-y-auto",
      )}>
      {tasks
        ?.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(task =>(
          <TaskCard 
            task={task} 
            key={task.id}
            updateOptimisticTasks={updateOptimisticTasks}
          />
        ))
      }
      {!tasks || tasks.length === 0 && <NoTasks/>}
      </div>
    </div>
  )
}
