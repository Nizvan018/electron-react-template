// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import type { AddUserType } from "./schemas/addUserSchema";
import type { IpcBridge } from "./lib/ipcHandlers";
import type { AddTaskType } from "./schemas/addTaskSchema";

const bridge: IpcBridge = {
    getUsers: () => ipcRenderer.invoke("api:getUsers"),
    addUser: (data: AddUserType) => ipcRenderer.invoke("api:addUser", data),
    getTaskByUser: (idUser: string) => ipcRenderer.invoke("api:getTaskByUser", idUser),
    addTask: (data: AddTaskType) => ipcRenderer.invoke("api:addTask", data)
}

contextBridge.exposeInMainWorld("api", bridge);
