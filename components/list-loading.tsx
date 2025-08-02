'use client'

import { cn } from "@/lib/utils"

export default function ListLoading() {
  return (
    <div className={cn(
      "flex flex-col gap-4 text-white mt-20 w-full",
      "max-h-[80%] overflow-y-scroll"
    )}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col p-4 bg-slate-700 rounded-xl animate-pulse"
        >
          <div className="h-6 bg-slate-600 rounded mb-2 w-2/5" />
          <div className="h-4 bg-slate-600 rounded w-3/5" />
        </div>
      ))}
    </div>
  )
}
