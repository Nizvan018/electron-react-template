import { NavLink } from "react-router-dom"

export default function Navbar() {
    const linkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "text-blue-500 font-semibold" : "font-medium";
    }

    return (
        <nav className="flex justify-center p-4">
            <ul className="flex gap-4 w-full max-w-2xl">
                <li>
                    <NavLink to="/" className={linkClass}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/addUser" className={linkClass}>Agregar usuario</NavLink>
                </li>
            </ul>
        </nav>
    )
}
