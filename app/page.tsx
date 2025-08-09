import { serverUrl } from "@/lib/utils";
import TasksClientContainer from "./task-client-container";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const response = await fetch(serverUrl + '/api/tasks')
  const tasks = response.json()

  return (
    <TasksClientContainer tasks={tasks}/>
  );
}
