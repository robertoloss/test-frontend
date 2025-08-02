'use client'

import { Task } from "@/types/types";
import NoTasks from "./no-tasks";
import TaskCard from "./task-card";
import { useEffect, useOptimistic } from "react";
import { useOptimisticStore } from "@/lib/store";

export default function ClientTaskList(props: { tasks: Task[] | undefined}) {
  const setUpdate = useOptimisticStore(s => s.setUpdateOptimisticTasks)

  const [ optimisticTasks, updateOptimisticTasks ] = useOptimistic(
    props.tasks,
    (prev, { action, task }: { action: string, task: Task }) => {
      switch (action) {
        case 'delete':
          return prev?.filter(t => t.id != task.id) || []
        case 'add':
          return prev ? [...prev, task] : [ task ]
      } 
    }
  )
  useEffect(() => {
    setUpdate(updateOptimisticTasks)
  }, [updateOptimisticTasks, setUpdate])

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
