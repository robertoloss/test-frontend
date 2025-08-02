'use client'

import { Task } from "@/types/types";
import NoTasks from "./no-tasks";
import TaskCard from "./task-card";
import { useOptimistic } from "react";

export default function ClientTaskList(props: { tasks: Task[] | undefined}) {
  const [ optimisticTasks, updateOptimisticTasks ] = useOptimistic(
    props.tasks,
    (prev, { action, task }: { action: string, task: Task }) => {
      switch (action) {
        case 'delete':
          return prev?.filter(t => t.id != task.id) || []
      } 
    }
  )
  return (
    <>
      {optimisticTasks
        ?.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(task =>(
          <TaskCard 
            task={task} 
            key={task.id}
            updateOptimisticTasks={updateOptimisticTasks}
          />
        ))
      }
      {!optimisticTasks || optimisticTasks.length === 0 && <NoTasks/>}
    </>
  )
}
