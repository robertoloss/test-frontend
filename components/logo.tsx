import Image from "next/image";

export default function Logo() {
  return (
    <Image
      className=""
      src="/logo2.svg"
      alt="app logo"
      width={226}
      height={48}
      priority
    />
  )
}
