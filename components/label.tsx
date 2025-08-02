import { cn } from "@/lib/utils"


type Props = {
  label: string
  color?: string
}
export default function Label({ label, color='text-[#4EA8DE]' }: Props) {

  return (
    <h1 
      className={cn(
        color,
        "font-bold"
      )}
    >
      { label }
    </h1>
  )
}
