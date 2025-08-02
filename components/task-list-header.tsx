'use client'
import { cn } from "@/lib/utils"
import { Task } from "@/types/types"
import Label from "./label"



type Props = {
  tasks: Task[] | undefined
}
export default function TaskListHeader({ tasks }: Props) {
  const completedCount = tasks?.reduce(
    (acc, task) => acc + (task.completed ? 1 : 0),
    0
  )

  return (
    <div className={cn(
      "flex flex-row w-full justify-between"
    )}>
      <div className="flex flex-row gap-2 items-center">
        <Label label="Tasks"/>
        <NumberPill num={tasks?.length || 0}/>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Label label="Completed" color="text-[#8284FA]"/>
        <NumberPill num={completedCount || 0} tasks={tasks?.length || 0}/>
      </div>
    </div>
  )
}


function NumberPill(props: { num: number, tasks?: number }) {
  return (
    <div className={cn(
      "bg-[#333333] text-[#d9d9d9] rounded-full flex items-center justify-center",
      "h-5 min-w-5 p-2 text-[12px] font-bold"
    )}>
      {props.num} {(props.tasks || props.tasks === 0) && <span>{'\u00A0'}of{'\u00A0'}{props.tasks}</span>}
    </div>
  )
}
