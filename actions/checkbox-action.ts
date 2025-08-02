'use server'
import { serverUrl } from "@/lib/utils"
import { revalidatePath } from "next/cache"

type Args = {
  newStatus: boolean
  id: number
}
export async function checkboxAction({ newStatus, id }: Args) {
  try {
    await fetch(serverUrl + `/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: newStatus 
        })
      })
    revalidatePath('/')
  } catch(error) {
    console.error(error)
  }
}
