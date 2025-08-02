'use client'

import BackArrow from "@/components/back-arrow";
import ColorSelector from "@/components/color-selector";
import { MainButton } from "@/components/main-button";
import MainForm from "@/components/main-form";
import { serverUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { Check, Loader2Icon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(191, 'Max 191 characters'),
  color: z.string().min(1, 'Please select a color'),
})

export type NewTask = z.infer<typeof taskSchema>


export default function TaskPage() {
  const [ incomplete, setIncomplete ] = useState(false)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (newTask: NewTask) => {
      console.log(newTask)
      return fetch(serverUrl + '/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTask.title,
          color: newTask.color
        })
      })
    },
    onSuccess: () => {
      form.setValue('color', '')
      form.setValue('title', '')
      router.refresh()
      router.push('/')
    }
  })
  const form = useForm<NewTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', color: '' },
    mode: 'onChange',
  })


  return (
    <div className="flex flex-col text-white w-full h-screen pt-[80px]">
      <BackArrow href="/"/>
      <div className="h-14"/>
      <MainForm 
        action={mutation.mutate} 
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
            disabled={mutation.isPending}
            type="submit"
            label="Save"
            showIcon={true}
          >
            {!mutation.isPending && <Check size={16} strokeWidth={4}/>}
            {mutation.isPending && <Loader2Icon className="animate-spin"/>}
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
