import { z } from "zod";

export const addTaskSchema = z.object({
    name: z.string()
        .min(1, "El nombre de la tarea es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(30, "Máximo 30 caracteres"),
    date: z.iso.date("La fecha no es válida"),
    user: z.string("Contenido inválido")
        .min(1, "El usuario es requerido")
});

export type AddTaskType = z.infer<typeof addTaskSchema>;
