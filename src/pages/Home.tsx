import { useState, useEffect } from "react"
import { User } from "../models/user.model";
import ErrorSpan from "../components/ErrorSpan";

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const users = await window.api.getUsers();

            setUsers(users);
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

            {error && (
                <ErrorSpan error={error} />
            )}

            <ul className="flex flex-col gap-1 p-2 rounded-md border border-slate-300 bg-slate-50">
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
