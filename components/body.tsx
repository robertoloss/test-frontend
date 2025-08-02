
type Props = {
  children?: React.ReactNode
}
export default function Body({ children }: Props) {
  return (
    <div className="flex flex-col items-center w-full bg-[#1A1A1A] h-[calc(100%-200px)]">
      <div className="flex flex-col items-center w-full max-w-[736px] h-full">
        { children }
      </div>
    </div>
  )
}
