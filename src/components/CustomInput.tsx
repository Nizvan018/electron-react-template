import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    error?: FieldError;
    className?: string;
}

export default function CustomInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
    disabled = false,
    error,
    className
}: Props<T>) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label
                htmlFor={name}
                className="text-sm font-semibold text-slate-600"
            >
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        id={name}
                        type={type}
                        {...field}
                        disabled={disabled}
                        placeholder={placeholder}
                        className="disabled:opacity-50 text-sm p-2 rounded-md border border-transparent bg-slate-100 outline-none focus:border-blue-500"
                    />
                )}
            />
            <span className="h-3 font-medium text-xs text-rose-500">
                {error?.message ?? ""}
            </span>
        </div>
    )
}
