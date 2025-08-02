
type Props = {
  children?: React.ReactNode
}
export default function Header({ children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[200px] bg-[#0D0D0D]">
      { children }
    </div>
  )
}
