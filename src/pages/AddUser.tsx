import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../schemas/addUserSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorSpan from "../components/ErrorSpan";

export default function AddUser() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            await window.api.addUser(data.name);

            navigate("/");
        } catch (error) {
            console.error(error);

            setError("Ha sucedido un error inesperado");
        }
    });

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Add User</h1>

            {error && (
                <ErrorSpan error={error} />
            )}

            <form className="flex flex-col gap-2">
                <CustomInput
                    name="name"
                    control={control}
                    label="Nombre del usuario"
                    placeholder="Keanu Reeves"
                    error={errors.name}
                />
            </form>

            <button onClick={onSubmit} className="text-white text-sm font-medium p-2 rounded-md bg-blue-500 transition cursor-pointer hover:bg-blue-600">
                Crear usuario
            </button>
        </div>
    )
}
