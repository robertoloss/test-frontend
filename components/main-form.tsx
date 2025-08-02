import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Label from "./label"
import { MainButton } from "./main-button"
import { PlusCircle } from "lucide-react"
import { UseMutateFunction } from "@tanstack/react-query"
import { NewTask } from "@/app/task/page"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export type Inputs = {
  color: string,
  title: string
}
type Props = {
  action: UseMutateFunction<Response, Error, NewTask, unknown>
  children: React.ReactNode
  form: UseFormReturn<Inputs, any, Inputs>
}
export default function MainForm({ action, children, form }: Props) {

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit((data)=>action(data))} 
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={() => (
            <FormItem>
              <Label label="Task"/>
              <FormControl>
                <Input 
                  placeholder="Ex. Brush your teeth" 
                  {...form.register("title")} 
                  className={cn(
                    "h-16 bg-[#262626] placeholder:text-base",
                    "border-[#333333]"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          { children }

      </form>
    </Form>
  )
}
