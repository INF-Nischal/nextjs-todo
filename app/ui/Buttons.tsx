'use client';

import { deleteTask } from "../lib/actions";

export function DeleteTask({ id }: { id: string }) {
    const deleteTaskWithId = deleteTask.bind(null, id);
  
    return (
      <form action={deleteTaskWithId} className="flex justify-center">
        <button className="text-white bg-red-500 w-[90px] text-sm px-4 py-2 font-[500] rounded-lg flex justify-center items-center">
          Delete
        </button>
      </form>
    );
  }

export function TaskStatus() {
  return (
    <button className="text-white bg-green-400 w-[90px] text-sm px-4 py-2 font-[500] rounded-lg flex justify-center items-center">Complete</button>
  )
}

