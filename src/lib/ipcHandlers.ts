import { ipcMain } from "electron";
import { getUsers, addUser, getUserById } from "../api/user";
import { getTasksByUser, addTask } from "../api/task";
import type { AddUserType } from "../schemas/addUserSchema";
import { SelectTask, type SelectUser } from "../db/schema";
import type { AddTaskType } from "../schemas/addTaskSchema";

export interface IpcBridge {
    // API for User table
    getUsers: () => Promise<{ result: SelectUser[] | null, error: string | null }>;
    getUserById: (id: string) => Promise<{ ok: true, user: SelectUser } | { ok: false, error: string }>;
    addUser: (data: AddUserType) => Promise<{ result: string | null, error: string | null }>;
    // API for Task table
    getTasksByUser: (idUser: string) => Promise<{ ok: true, tasks: SelectTask[] } | { ok: false, error: string }>;
    addTask: (data: AddTaskType) => Promise<{ ok: true, id: string } | { ok: false, error: string }>;
}

// API FOR USER TABLE:

ipcMain.handle("api:getUsers", () => {
    return getUsers();
});

ipcMain.handle("api:getUserById", (_event, id: string) => {
    return getUserById(id);
});

ipcMain.handle("api:addUser", (_event, payload: AddUserType) => {
    return addUser(payload);
});

// API FOR TASK TABLE:

ipcMain.handle("api:getTasksByUser", (_event, idUser: string) => {
    return getTasksByUser(idUser);
});

ipcMain.handle("api:addTask", (_event, payload: AddTaskType) => {
    return addTask(payload);
});
