'use server'

import { Inputs } from '@/components/main-form'
import { serverUrl } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function createTask(inputs: Inputs) {
  const { title, color } = inputs

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Title is required')
  }
  if (typeof color !== 'string' || !color.trim()) {
    throw new Error('Color is required')
  }
  try {
    await fetch(serverUrl + `/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        color
      })
    })
    revalidatePath('/')
  } catch(error) {
    console.error(error)
  }
}
