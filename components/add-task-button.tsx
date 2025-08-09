import { CirclePlus } from "lucide-react"
import { MainButton, OffsetY } from "./main-button"
import { Dispatch, SetStateAction } from "react"

type Props = {
  offsetY: OffsetY
  setShowAddTask: Dispatch<SetStateAction<boolean>>
}
export default function AddTaskButton({ offsetY, setShowAddTask }: Props) {
  return (
    <MainButton
      onClick={()=>setShowAddTask(true)}
      className="flex w-full"
      label="Create Task"
      showIcon={true}
      offsetY={offsetY}
    >
      <CirclePlus/>
    </MainButton>
  )
}
