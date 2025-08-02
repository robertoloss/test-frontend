import AddTaskButton from "@/components/add-task-button";
import TaskList from "@/components/task-list";
import { serverUrl } from "@/lib/utils";

export default async function Home() {

  const response = await fetch(serverUrl + '/api/tasks')
  const tasks = response.json()

  return (
    <div className="flex flex-col h-fit min-h-0 w-full pb-10">
      <AddTaskButton offsetY="-mt-7"/>
      <TaskList tasks={tasks}/>
    </div>
  );
}
