import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema } from "../schemas/addTaskSchema";

const testOptions = [
    { value: "user1", label: "user1" },
    { value: "user2", label: "user2" }
];

export default function AddUser() {
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

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-xl font-bold">Add Task</h1>

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
                        options={testOptions}
                        label="Usuario"
                        placeholder="Seleccione un usuario..."
                        error={errors.user}
                        className="w-full"
                    />
                </div>
            </form>

            <button onClick={onSubmit} className="text-white text-sm font-medium p-2 rounded-md bg-blue-500 transition cursor-pointer hover:bg-blue-600">
                Agregar tarea
            </button>
        </div>
    )
}
