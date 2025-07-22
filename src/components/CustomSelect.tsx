import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import Select from "react-select";

type Option = {
    value: string;
    label: string;
}

interface Props<TField extends FieldValues, TOption extends Option> {
    name: Path<TField>;
    control: Control<TField>;
    options: TOption[];
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    error?: FieldError;
    className?: string;
}

export default function CustomSelect<TField extends FieldValues, TOption extends Option>({
    name,
    control,
    options,
    label,
    placeholder,
    isDisabled = false,
    isClearable = true,
    isSearchable = true,
    error,
    className
}: Props<TField, TOption>) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label
                htmlFor={name}
                className="text-sm font-medium"
            >
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select<TOption, false>
                        id={name}
                        {...field}
                        onChange={(option) => field.onChange(option?.value)}
                        value={options.find(option => option.value === field.value)}
                        options={options}
                        isDisabled={isDisabled}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        placeholder={placeholder}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 8,
                            colors: {
                                ...theme.colors,
                                primary25: "color-mix(in oklab, #dbeafe, transparent)",
                                primary: "#2b7fff",
                            }
                        })}
                    />
                )}
            />
            <span className="h-3 font-medium text-xs text-rose-500">
                {error?.message ?? ""}
            </span>
        </div>
    )
}
