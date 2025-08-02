import { UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Label from "./label"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

export type Inputs = {
  color: string,
  title: string
}
type Props = {
  action:(inputs: Inputs) => Promise<void> 
  children: React.ReactNode
  form: UseFormReturn<Inputs, any, Inputs>
  setIncomplete: Dispatch<SetStateAction<boolean>>
}
export default function MainForm({ action, children, form, setIncomplete }: Props) {

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit((data)=> action(data))} 
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
                  onFocus={()=>setIncomplete(false)}
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
