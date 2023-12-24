import { fetchTasks } from "../lib/data";
import { DeleteTask, TaskStatus } from "./Buttons";

export default async function TasksTable() {
  const tasks = await fetchTasks();

  return (
    <div className="min-h-[90vh] flex justify-center pt-5">
      <div className="w-6/12">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="h-5rem] flex justify-between  border-2 px-4 py-2 mb-3"
          > 
            <p className="leading-6 text-[1.025rem] w-6/12">{task.title}</p>
            <div className="flex items-center gap-5">
              <TaskStatus />
              <DeleteTask id={task.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
