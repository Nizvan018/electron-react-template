import { useState, useEffect, useTransition } from "react";
import type { SelectUser, SelectTask } from "../db/schema";
import { useParams } from "react-router-dom";
import ErrorSpan from "../components/ErrorSpan";

export default function UserTask() {
    const { id } = useParams();
    const [user, setUser] = useState<SelectUser | null>(null);
    const [tasks, setTasks] = useState<SelectTask[]>([]);
    const [loading, startLoading] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            const res = await window.api.getUserById(id);

            if (res.ok === false) {
                setError(error);
                return;
            }

            setUser(res.user);
            await fetchTasks();
        } catch (error) {
            console.error(error);
            setError("Unexpected error on user fetch, please try again");
        }
    }

    const fetchTasks = async () => {
        try {
            const res = await window.api.getTasksByUser(id);

            if (res.ok === false) {
                setError(error);
                return;
            }

            setTasks(res.tasks);
        } catch (error) {
            console.error(error);
            setError("Unexpected error on user fetch, please try again");
        }
    }

    useEffect(() => {
        startLoading(async () => {
            await fetchUser();
        });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <span>Cargando...</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Tareas de {user?.name}</h1>

            <ErrorSpan error={error} />

            <ul className="overflow-hidden flex flex-col rounded-md border border-slate-300 bg-slate-50">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between gap-4 py-1 px-2 hover:bg-slate-100">
                        <span>{task.name}</span>
                        <span>{new Date(task.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
