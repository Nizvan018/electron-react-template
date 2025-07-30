import { eq } from "drizzle-orm";
import { db } from "../db";
import { task, SelectTask } from "../db/schema";
import { addTaskSchema, type AddTaskType } from "../schemas/addTaskSchema";

/**
 * Get all tasks of a user using their id
 * 
 * @param {string} idUser 
 * @returns If ok=true a Task array, if not an error string
 */
export const getTaskByUser = async (idUser: string): Promise<
    { ok: true; tasks: SelectTask[] } | { ok: false; error: string }
> => {
    try {
        const tasks = await db.select().from(task).where(eq(task.idUser, idUser));

        return { ok: true, tasks }
    } catch (error) {
        console.log(error);
        return { ok: false, error: "Unexpected error" }
    }
}

/**
 * Add a new task
 * 
 * @param {AddTaskType} formData 
 * @returns If ok=true a new task id, if not an error string
 */
export const addTask = async (formData: AddTaskType): Promise<
    { ok: true, id: string } | { ok: false, error: string }
> => {
    try {
        const { data, success } = addTaskSchema.safeParse(formData);

        if (!success) {
            return { ok: false, error: "Invalid form data" }
        }

        const id = crypto.randomUUID();
        const now = new Date();

        await db.insert(task).values({
            id,
            name: data.name,
            date: new Date(data.date),
            idUser: data.user,
            createdAt: now,
            updatedAt: now
        });

        return { ok: true, id }
    } catch (error) {
        console.log(error);
        return { ok: false, error: "Unexpected error" }
    }
}
