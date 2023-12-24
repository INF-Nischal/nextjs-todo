import TaskForm from "./ui/addTodo"
import { fetchTasks } from "./lib/data"

export default async function Home() {
  const tasks = await fetchTasks();
  return (
    <main className="min-h-screen overflow-hidden">
      <h1>Todo List</h1>
      <TaskForm taskSchema={tasks}/>
    </main>
  )
}
