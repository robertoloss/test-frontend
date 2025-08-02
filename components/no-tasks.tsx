import { cn } from "@/lib/utils";
import Clipboard from "./clipboard";


export default function NoTasks() {
  return (
    <div className={cn(
      "text-[#808080] flex flex-col items-center",
      "rounded-lg border-[#333333] border-t w-full",
      "py-16 px-6 gap-y-4"
    )}>
      <Clipboard/>
      <h1 className="font-semibold">
        You don't have no tasks registered yet
      </h1>
      <h1>
        Create tasks and organize your to-do items.
      </h1>
    </div>
  )
}
