import AddTaskButton from "@/components/add-task-button";
import ListLoading from "@/components/list-loading";
import { Task } from "@/types/types";
import { Dispatch, SetStateAction, Suspense } from "react";
import { UpdateOptimisticTasks } from "./task-client-container";
import ClientTaskList from "@/components/task-list-client";


type Props = {
  tasks: Task[]
  updateOptimisticTasks: UpdateOptimisticTasks
  setShowAddTask: Dispatch<SetStateAction<boolean>>
}
export default function TaskListContainer({ tasks, setShowAddTask, updateOptimisticTasks }: Props) {
  return (
    <div className="flex flex-col h-fit min-h-0 w-full pb-10">
      <AddTaskButton 
        setShowAddTask={setShowAddTask}
        offsetY="-mt-7"
      />
      <Suspense fallback={<ListLoading/>}>
        <ClientTaskList 
          tasks={tasks}
          updateOptimisticTasks={updateOptimisticTasks}
        />
      </Suspense>
    </div>
  )
}
