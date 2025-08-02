import { ArrowLeft } from "lucide-react"
import Link from "next/link"


type Props = {
  href: string
}
export default function BackArrow({ href }: Props) {
  return (
    <Link href={href}>
      <ArrowLeft/>
    </Link>
  )
}
