import { ipcMain } from "electron";
import { addUser, getUsers, User } from "../models/user.model";

export interface IpcBridge {
    getUsers: () => Promise<User[]>;
    addUser: (name: string) => Promise<User>;
}

// API FOR USER TABLE:

ipcMain.handle("api:getUsers", () => {
    return getUsers();
});

ipcMain.handle("api:addUser", (_event, name: string) => {
    return addUser(name);
});
