'use client'

import BackArrow from "@/components/back-arrow";
import ColorSelector from "@/components/color-selector";
import { MainButton } from "@/components/main-button";
import MainInput, { Inputs } from "@/components/main-form";
import { serverUrl } from "@/lib/utils";
import { useMutation } from '@tanstack/react-query';
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

export type NewTask = {
  title: string
  color: string
}

export default function TaskPage() {
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
    }
  })
  const form = useForm<Inputs>()

  return (
    <div className="flex flex-col text-white w-full h-screen pt-[80px]">
      <BackArrow href="/"/>
      <div className="h-14"/>
      <MainInput  action={mutation.mutate} form={form}>
        <ColorSelector
          selectedColor={form.watch("color")}
          setValue={(color) => form.setValue("color", color)}
        />
        <MainButton
          type="submit"
          label="Add Task"
          showIcon={true}
        >
          <PlusCircle size={16}/>
        </MainButton>
      </MainInput>
    </div>
  )
}
