import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import ErrorSpan from "../components/ErrorSpan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema } from "../schemas/addTaskSchema";
import { useState, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

interface Option {
    value: string;
    label: string;
}

export default function AddTask() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<Option[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, startLoading] = useTransition();
    const [adding, startAdding] = useTransition();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addTaskSchema),
        defaultValues: {
            name: "",
            date: "",
            user: ""
        }
    });

    // Add task on submit
    const onSubmit = handleSubmit(async (data) => {
        startAdding(async () => {
            try {
                const res = await window.api.addTask(data);

                if (res.ok === false) {
                    setError(res.error);
                    return;
                }

                navigate("/");
            } catch (error) {
                console.log(error);
                setError("Unexpected error, please try again");
            }
        });
    });

    // Get all of the users
    const fetchUsers = async () => {
        startLoading(async () => {
            try {
                const res = await window.api.getUsers();

                if (res.error) {
                    setError(res.error);
                    return;
                }

                const users = res.result.map(user => ({ value: user.id, label: user.name }));
                setUsers(users);
            } catch (error) {
                console.log(error);
                setError("Unexpected error on fetching users, please try again");
            }
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Add Task</h1>

            <ErrorSpan error={error} />

            {loading ? (
                <span>Cargando...</span>
            ) : (
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
                            options={users}
                            label="Usuario"
                            placeholder="Seleccione un usuario..."
                            error={errors.user}
                            className="w-full"
                        />
                    </div>
                </form>
            )}

            <button
                onClick={onSubmit}
                disabled={adding}
                className="disabled:opacity-50 text-white text-sm font-medium p-2 rounded-md bg-blue-500 transition cursor-pointer hover:bg-blue-600"
            >
                Agregar tarea
            </button>
        </div>
    )
}
