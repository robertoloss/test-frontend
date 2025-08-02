import AddTaskButton from "@/components/add-task-button";
import ListLoading from "@/components/list-loading";
import TaskList from "@/components/task-list";
import { serverUrl } from "@/lib/utils";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const response = await fetch(serverUrl + '/api/tasks')
  const tasks = response.json()

  return (
    <div className="flex flex-col h-fit min-h-0 w-full pb-10">
      <AddTaskButton offsetY="-mt-7"/>
      <Suspense fallback={<ListLoading/>}>
        <TaskList tasks={tasks}/>
      </Suspense>
    </div>
  );
}
