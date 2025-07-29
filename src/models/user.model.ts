import db from "../lib/dbmanager";
import { nowISO } from "../lib/dbHelpers";

export interface User {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

// Ensure that the user name is unique
const ensureUniqueUserName = (name: string) => {
    const userExists = db
        .prepare("SELECT COUNT(*) as count FROM user WHERE name = ?")
        .get(name) as { count: number };

    if (userExists.count > 0) {
        throw new Error(`Ya existe un usuario con el nombre ${name}`);
    }
}

// Get all users
export const getUsers = (): User[] => {
    const query = "SELECT * FROM user ORDER BY createdAt DESC";
    const stmt = db.prepare(query);
    const users = stmt.all() as User[];

    return users;
}

// Add a new user
export const addUser = (name: string): User => {
    ensureUniqueUserName(name);

    const id = crypto.randomUUID();
    const now = nowISO();

    const stmt = db.prepare(`
        INSERT INTO user (id, name, createdAt, updatedAt)
        VALUES (?, ?, ?, ?)
    `);

    stmt.run(id, name, now, now);

    return { id, name, createdAt: now, updatedAt: now }
}
