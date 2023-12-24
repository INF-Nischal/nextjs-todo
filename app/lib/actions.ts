"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { tasks } from "./definitions";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, { message: "Title is required" }),
});

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const AddTask = FormSchema.omit({ id: true });

export async function addTask(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validateFields = AddTask.safeParse({
    title: formData.get("title"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Please fix the errors below and try again",
    };
  }

  const { title } = validateFields.data;
  console.log("Saving task", title);

  try {
    await sql<tasks>`INSERT INTO tasks (title) VALUES (${title})`;
    console.log("Task saved successfully");
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while saving your task",
    };
  }

  revalidatePath("/");
  return { errors: undefined, message: null };
}

export async function deleteTask(id: string) {
  console.log("Deleting task", id);

  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    console.log("Task deleted successfully");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting your task");
  }

  revalidatePath("/");
}
