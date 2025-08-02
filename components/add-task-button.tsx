import { CirclePlus } from "lucide-react"
import Link from "next/link"
import { MainButton, OffsetY } from "./main-button"

type Props = {
  offsetY: OffsetY
}
export default function AddTaskButton({ offsetY }: Props) {
  return (
    <Link 
      href='task'
      className="flex w-full"
    >
      <MainButton
        label="Create Task"
        showIcon={true}
        offsetY={offsetY}
      >
        <CirclePlus/>
      </MainButton>
    </Link>
  )
}
