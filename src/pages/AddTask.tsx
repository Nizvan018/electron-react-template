import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema } from "../schemas/addTaskSchema";
import { useState, useEffect } from "react";
import ErrorSpan from "../components/ErrorSpan";

interface Option {
    value: string;
    label: string;
}

export default function AddUser() {
    const [userOptions, setUserOptions] = useState<Option[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addTaskSchema),
        defaultValues: {
            name: "",
            date: "",
            user: ""
        }
    });

    const onSubmit = handleSubmit(data => {
        console.log(data);
    });

    const fetchUsers = async () => {
        try {
            const users = await window.api.getUsers();
            const options = users.map(user => ({ value: user.id, label: user.name }));

            setUserOptions(options);
        } catch (error) {
            console.error(error);
            setError("Ha sucedido un error inesperado al recuperar a los usuarios");
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        !isFetching ? (
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <h1 className="text-xl font-bold">Add Task</h1>

                {error && (
                    <ErrorSpan error={error} />
                )}

                <form className="flex flex-col gap-2">
                    <CustomInput
                        name="name"
                        control={control}
                        label="Nombre"
                        placeholder="Tarea increíble"
                        error={errors.name}
                    />

                    <div className="flex items-center gap-2 w-full">
                        <CustomInput
                            name="date"
                            control={control}
                            label="Fecha de entrega"
                            type="date"
                            error={errors.date}
                            className="w-full"
                        />

                        <CustomSelect
                            name="user"
                            control={control}
                            options={userOptions}
                            label="Usuario"
                            placeholder="Seleccione un usuario..."
                            isClearable={false}
                            error={errors.user}
                            className="w-full"
                        />
                    </div>
                </form>

                <button onClick={onSubmit} className="text-white text-sm font-medium p-2 rounded-md bg-blue-500 transition cursor-pointer hover:bg-blue-600">
                    Agregar tarea
                </button>
            </div>
        ) : (
            <span>Cargando...</span>
        )
    )
}
