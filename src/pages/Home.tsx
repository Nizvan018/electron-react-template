import { useState, useEffect } from "react"
import { type SelectUser } from "../db/schema";
import ErrorSpan from "../components/ErrorSpan";
import { NavLink } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState<SelectUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await window.api.getUsers();

            if (res.error) {
                setError(res.error);
                return;
            }

            setUsers(res.result);
        } catch (error) {
            console.log(error);
            setError("Ha sucedido un error inesperado");
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Hi, this is the home page! 🐶</h1>

            <ErrorSpan error={error} />

            <ul className="overflow-hidden flex flex-col rounded-md border border-slate-300 bg-slate-50">
                {users.map(user => (
                    <li key={user.id} className="flex items-center justify-between gap-4 py-1 px-2 hover:bg-slate-100">
                        <span>{user.name}</span>
                        <NavLink to={`/userTask/${user.id}`} className="text-xs font-medium text-blue-500 hover:underline">Ver usuario y tareas</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
