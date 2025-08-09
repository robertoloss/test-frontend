'use client'

import { Task } from "@/types/types"
import { use, useOptimistic, useState } from "react"
import AddTask from "./add-task"
import TaskListContainer from "./task-list-container"

export type UpdateOptimisticTasks = (action: {
    action: string;
    task: Task;
}) => void

type Props ={
  tasks: Promise<{ message: string, tasks: Task[]}>
}
export default function TasksClientContainer({ tasks }: Props) {
  const allTasks = use(tasks).tasks
  const [ showAddTask, setShowAddTask ] = useState(false)
  const [ optimisticTasks, updateOptimisticTasks ] = useOptimistic(
    allTasks,
    (prev, { action, task }: { action: string, task: Task }) => {
      switch (action) {
        case 'delete':
          return prev?.filter(t => t.id != task.id) || []
        case 'add':
          return prev ? [...prev, task] : [ task ]
        case 'check':
          return prev ? [...prev.filter(t=>t.id!=task.id), task] : [ task ]
      } 
      return []
    }
  )
  return (
    <>
      {!showAddTask && 
        <TaskListContainer 
          tasks={optimisticTasks}
          updateOptimisticTasks={updateOptimisticTasks}
          setShowAddTask={setShowAddTask}
        />
      }
      {showAddTask && 
        <AddTask 
          setShowAddTask={setShowAddTask}
          updateOptimisticTasks={updateOptimisticTasks}
        />
      }
    </>
  )
}
