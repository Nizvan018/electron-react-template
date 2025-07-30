import CustomInput from "../components/CustomInput";
import ErrorSpan from "../components/ErrorSpan";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../schemas/addUserSchema";
import { useState } from "react";

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
        const res = await window.api.addUser(data);

        if (res.error) {
            setError(res.error);
            return;
        }

        navigate("/");
    });

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Add User</h1>

            <ErrorSpan error={error} />

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
