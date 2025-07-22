import { NavLink } from "react-router-dom"

export default function Navbar() {
    const linkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "text-blue-500 font-semibold" : "font-medium";
    }

    return (
        <nav className="flex gap-4 p-4">
            <NavLink to="/" className={linkClass}>Inicio</NavLink>
            <NavLink to="/addUser" className={linkClass}>Agregar usuario</NavLink>
        </nav>
    )
}
