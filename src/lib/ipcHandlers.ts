import { ipcMain } from "electron";
import { getUsers, addUser } from "../api/user";
import { getTaskByUser, addTask } from "../api/task";
import type { AddUserType } from "../schemas/addUserSchema";
import { SelectTask, type SelectUser } from "../db/schema";
import type { AddTaskType } from "../schemas/addTaskSchema";

export interface IpcBridge {
    // API for User table
    getUsers: () => Promise<{ result: SelectUser[] | null, error: string | null }>;
    addUser: (data: AddUserType) => Promise<{ result: string | null, error: string | null }>;
    // API for Task table
    getTaskByUser: (idUser: string) => Promise<{ ok: true, task: SelectTask } | { ok: false, error: string }>;
    addTask: (data: AddTaskType) => Promise<{ ok: true, id: string } | { ok: false, error: string }>;
}

// API FOR USER TABLE:

ipcMain.handle("api:getUsers", () => {
    return getUsers();
});

ipcMain.handle("api:addUser", (_event, payload: AddUserType) => {
    return addUser(payload);
});

// API FOR TASK TABLE:

ipcMain.handle("api:getTaskByUser", (_event, idUser: string) => {
    return getTaskByUser(idUser);
});

ipcMain.handle("api:addTask", (_event, payload: AddTaskType) => {
    return addTask(payload);
});
