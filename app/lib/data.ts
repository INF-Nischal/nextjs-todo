'use server';

import {sql} from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { tasks } from "./definitions";

export async function fetchTasks() {
    noStore();

    try {
        const result = await sql<tasks>`SELECT * FROM tasks`;
        const tasks = result.rows;
        return tasks;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred fetching tasks");
    }
}