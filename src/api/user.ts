import { db } from "../db";
import { user, type SelectUser } from "../db/schema";
import { addUserSchema, type AddUserType } from "../schemas/addUserSchema";

export const getUsers = async (): Promise<{ result: SelectUser[] | null, error: string | null }> => {
    try {
        const users = await db.select().from(user);

        return { result: users, error: null }
    } catch (error) {
        console.error(error);
        return { result: null, error: "Unexpected error" }
    }
}

export const addUser = async (formData: AddUserType): Promise<{ result: string | null, error: string | null }> => {
    try {
        const now = new Date();

        const { data, success } = addUserSchema.safeParse(formData);

        if (!success) {
            return { result: null, error: "Invalid form data" }
        }

        const id = crypto.randomUUID();

        await db.insert(user).values({
            id: id,
            name: data.name,
            createdAt: now,
            updatedAt: now
        });

        return { result: id, error: null }
    } catch (error) {
        console.error(error);

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return { result: null, error: "The name is already in use" }
        }

        return { result: null, error: "Unexpected error" }
    }
}
