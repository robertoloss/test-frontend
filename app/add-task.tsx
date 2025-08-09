import { createTask } from "@/actions/create-task";
import ColorSelector from "@/components/color-selector";
import { MainButton } from "@/components/main-button";
import MainForm, { Inputs } from "@/components/main-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Loader2Icon, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { UpdateOptimisticTasks } from "./task-client-container";

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(191, 'Max 191 characters'),
  color: z.string().min(1, 'Please select a color'),
})

export type NewTask = z.infer<typeof taskSchema>

type Props = {
  setShowAddTask: Dispatch<SetStateAction<boolean>>
  updateOptimisticTasks: UpdateOptimisticTasks
}
export default function AddTask({ setShowAddTask, updateOptimisticTasks }: Props) {
  const [ incomplete, setIncomplete ] = useState(false)

  const form = useForm<NewTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', color: '' },
    mode: 'onChange',
  })
  const [isPending, startTransition] = useTransition()

  async function handleCreateTask(data: Inputs) {
    setShowAddTask(false)
    startTransition(()=>updateOptimisticTasks({
      action: 'add',
      task: {
        id: -9999999,
        title: data.title,
        color: data.color,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
      }
    }))
    await createTask(data)
  }

  return (
    <div className="pb-10 flex flex-col text-white w-full h-screen pt-4 sm:pt-[80px]">
      <div 
        className="flex rounded-full hover:scale-110 aspect-square w-fit transition-all hover:cursor-pointer"
        onClick={()=>setShowAddTask(false)}
      >
        <ArrowLeft/>
      </div>
      <div className="h-4 sm:h-14"/>
      <MainForm 
        action={handleCreateTask} 
        form={form}
        setIncomplete={setIncomplete}
      >
        <ColorSelector
          selectedColor={form.watch("color")}
          setValue={(color) => form.setValue("color", color)}
          setIncomplete={setIncomplete}
        />
        {(!form.getValues('color') || !form.getValues('title')) &&
          <MainButton
            type="button"
            label="Add Task"
            showIcon={true}
            onClick={()=>{setIncomplete(true)}}
          >
            <PlusCircle size={16}/>
          </MainButton>
        }
        {(form.getValues('color') && form.getValues('title')!='') && 
          <MainButton
            disabled={isPending}
            type="submit"
            label="Save"
            showIcon={true}
          >
            {!isPending && <Check size={16} strokeWidth={4}/>}
            {isPending && <Loader2Icon className="animate-spin"/>}
          </MainButton>
        }
        {incomplete &&
          <h1 className="text-red-500 text-md">
            Enter both a title and some color
          </h1>
        }
      </MainForm>
    </div>
  )
}
