import { eq } from "drizzle-orm";
import { db } from "../db";
import { user, type SelectUser } from "../db/schema";
import { addUserSchema, type AddUserType } from "../schemas/addUserSchema";

/**
 * Get all the users
 * 
 * @returns An User array or an error
 */
export const getUsers = async (): Promise<{ result: SelectUser[] | null, error: string | null }> => {
    try {
        const users = await db.select().from(user);

        return { result: users, error: null }
    } catch (error) {
        console.error(error);
        return { result: null, error: "Unexpected error" }
    }
}

/**
 * Get an especific user using their id
 * 
 * @param {string} id 
 * @returns If ok=true returns a user, if not returns an error string
 */
export const getUserById = async (id: string): Promise<
    { ok: true, user: SelectUser } | { ok: false, error: string }
> => {
    try {
        const foundUser = await db.select().from(user).where(eq(user.id, id)).get();

        if (!foundUser) {
            return { ok: false, error: "User not found" }
        }

        return { ok: true, user: foundUser }
    } catch (error) {
        console.error(error);
        return { ok: false, error: "Unexpected error" }
    }
}

/**
 * Add a new user
 * 
 * @param {AddUserType} formData 
 * @returns The new user id or an error
 */
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


