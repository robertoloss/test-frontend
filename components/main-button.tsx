import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export type OffsetY = `-mt-${number}` | `mt-${number}` | undefined 

type Props = {
  offsetY?: OffsetY 
  onClick?: (args: unknown) => void
  label: string
  showIcon?: boolean
  children?: React.ReactNode
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}
export function MainButton({ 
  offsetY, 
  onClick,
  label,
  showIcon,
  children,
  type,
  disabled
}
  : Props
) {
  return (
    <Button 
      disabled={disabled}
      type={type}
      className={cn(
        "bg-[#1E6F9F] h-14 w-full font-bold",
        offsetY,
        "hover:opacity-90 hover:cursor-pointer hover:bg-[#1E6F9F]",
        { "hover:cursor-not-allowed": disabled }
      )}
      onClick={onClick}
    >
      <h1>
        {label}
      </h1>
      {showIcon && children}
    </Button>
  )

}
