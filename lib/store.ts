import { create } from 'zustand'
import { Task } from '@/types/types'

type OptimisticAction = {
  action: 'add' | 'delete'
  task: Task
}

export type UpdateOptimisticTasks = (action: OptimisticAction) => void

interface OptimisticStore {
  updateOptimisticTasks?: UpdateOptimisticTasks
  setUpdateOptimisticTasks: (fn: UpdateOptimisticTasks) => void
  clearUpdateOptimisticTasks: () => void
}

export const useOptimisticStore = create<OptimisticStore>((set) => ({
  updateOptimisticTasks: undefined,
  setUpdateOptimisticTasks: (fn) => set({ updateOptimisticTasks: fn }),
  clearUpdateOptimisticTasks: () => set({ updateOptimisticTasks: undefined }),
}))
