'use server'
import { serverUrl } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function deleteTask(id: number) {
  console.log("delete task")
  try {
    await fetch(serverUrl + `/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    revalidatePath('/')
  } catch(error) {
    console.error(error)
  }
}
