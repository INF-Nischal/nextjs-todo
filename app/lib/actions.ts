"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, { message: "Title is required" }),
});

export type State = {
  errors?: {
    title?: string[];
  } | undefined;
  message?: string | null | undefined;
};

const AddTask = FormSchema.omit({ id: true });

export async function addTask(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validateFields = AddTask.safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Please fix the errors below and try again",
    };
  }

  const { title } = validateFields.data;

  try {
    await sql`INSERT INTO taskSchema (title) VALUES (${title})`;
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
