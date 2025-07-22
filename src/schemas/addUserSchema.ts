import { z } from "zod";

export const addUserSchema = z.object({
    name: z.string()
        .min(1, "El nombre del usuario es requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(30, "Máximo 30 caracteres"),
});

export type AddUserType = z.infer<typeof addUserSchema>;
