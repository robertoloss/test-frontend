'use client'

import { Task } from "@/types/types";
import NoTasks from "./no-tasks";
import TaskCard from "./task-card";
import { useEffect, useOptimistic } from "react";
import { useOptimisticStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import TaskListHeader from "./task-list-header";

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
        case 'check':
          return prev ? [...prev.filter(t=>t.id!=task.id), task] : [ task ]
      } 
    }
  )
  useEffect(() => {
    setUpdate(updateOptimisticTasks)
  }, [updateOptimisticTasks, setUpdate])

  return (
    <>
      <TaskListHeader tasks={optimisticTasks}/>
      <div className={cn(
        "flex gap-4 flex-col w-full",
        "max-h-[80%] overflow-y-scroll"
      )}>
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
      </div>
    </>
  )
}
