"use client";

import { tasks } from "../lib/definitions";
import { addTask } from "../lib/actions";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function TaskForm({ tasks }: { tasks: tasks[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addTask, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(formData);
    setInputValue("");  
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-2/3">
      <div className="w-2/3">
        <input
          type="text"
          name="title"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a task"
          className="w-full border-2 focus:outline-none focus:ring focus:border-blue-500 rounded-xl px-4 py-2"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mx-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <button type="submit" className="px-4 py-2 border-2 ml-5 rounded-xl">
        Add Task
      </button>
    </form>
  );
}
