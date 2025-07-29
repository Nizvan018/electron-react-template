import type { IpcBridge } from "src/lib/ipcHandlers";

declare global {
    interface Window {
        api: IpcBridge
    }
}