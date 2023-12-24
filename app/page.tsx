import TaskForm from "./ui/addTodo";
import { fetchTasks } from "./lib/data";
import TasksTable from "./ui/taskTable";

export default async function Home() {
  const tasks = await fetchTasks();
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="h-[10vh] flex justify-between items-center px-8 shadow-md">
        <h1 className="font-bold text-2xl">Todo List</h1>
        <TaskForm tasks={tasks} />
      </div>
      <TasksTable />
    </main>
  );
}
