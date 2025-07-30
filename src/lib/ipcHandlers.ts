import { ipcMain } from "electron";
import { getUsers, addUser } from "../api/user";
import type { AddUserType } from "../schemas/addUserSchema";
import { type SelectUser } from "../db/schema";

export interface IpcBridge {
    getUsers: () => Promise<{ result: SelectUser[] | null, error: string | null }>;
    addUser: (data: AddUserType) => Promise<{ result: string | null, error: string | null }>
}

// API FOR USER TABLE:

ipcMain.handle("api:getUsers", () => {
    return getUsers();
});

ipcMain.handle("api:addUser", (_event, payload: AddUserType) => {
    return addUser(payload);
});
