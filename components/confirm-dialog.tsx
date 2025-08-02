import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"


type Props = {
  title: string,
  description?: string,
  action: (args?: unknown)=> void
  children: React.ReactNode
}
export function ConfirmDialog({ title, description, action, children }: Props) {
  const [ open, setOpen ] = useState(false)
  const [ actionInProgress, setActionInProgress ] = useState(false)

  async function handleConfirm() {
    setActionInProgress(true)
    await action()
    setOpen(false)
    setActionInProgress(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            { title }
          </DialogTitle>
          {description && 
            <DialogDescription>
              {description}
            </DialogDescription>
          }
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button 
              className="text-black cursor-pointer"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="flex cursor-pointer w-[100px] text-left"
            onClick={handleConfirm}
          >
            <h1 className="flex w-fit">
              Confirm
            </h1>
            {actionInProgress && <Loader2Icon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
