'use client';

import { taskSchema } from "../lib/definitions";
import { addTask } from "../lib/actions";
import { useFormState } from "react-dom";

export default function TaskForm({taskSchema}: {taskSchema: taskSchema[]}) {
  const initialstate = {message: null, error: {}};
  const [state, dispatch] = useFormState(addTask, initialstate);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className="border-2 focus:outline-none focus:ring focus:border-blue-500 rounded-xl px-4 py-2"
      />
      <div id="pname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
                state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
      <button type="submit" className="px-4 py-2 border-2">Add Task</button>
    </form>
  );
};
