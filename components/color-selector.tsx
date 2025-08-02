import { Dispatch, SetStateAction } from "react"
import Label from "./label"
import { cn } from "@/lib/utils"

const colors = [
  'bg-[#ef4444]',
  'bg-[#3b82f6]',
  'bg-[#10b981]',
  'bg-[#f59e0b]',
  'bg-[#8b5cf6]',
  'bg-[#ec4899]'
]

type Props = {
  selectedColor: string
  setValue: (color: string) => void
  setIncomplete: Dispatch<SetStateAction<boolean>>
}
export default function ColorSelector({ selectedColor, setValue, setIncomplete }: Props) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Label label="Color"/>
      <div className="flex flex-row gap-2 h-fit">
        {colors.map(color => (
          <ColorCircle 
            key={color} 
            color={color}
            setValue={setValue}
            selectedColor={selectedColor}
            setIncomplete={setIncomplete}
          />
        ))}
      </div>
    </div>
  )
}


type PropsCC = {
  color: string
  setValue: (color: string) => void;
  selectedColor: string
  setIncomplete: Dispatch<SetStateAction<boolean>>
}
function ColorCircle({ color, setValue, selectedColor, setIncomplete }: PropsCC) {

  function selectColor() {
    setIncomplete(false)
    if (color === selectedColor) {
      setValue('')
    } else {
      setValue(color)
    }
  }

  return (
    <div 
      className={cn(
        "flex h-10 w-10 rounded-full transition-all", 
        color,
        "hover:cursor-pointer hover:opacity-90",
        selectedColor === color ? "ring-2 ring-white" : ""
      )}
      onClick={selectColor}
    />
  )
}



