import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ValidationErrors } from "@/validation/auth"

function TextField(
    {
        label,
        name,
        type,
        placeholder,
        disabled,
        autoFocus,
        error,
        defaultValue,
        readOnly,
        onChange,
        value
    }: {
        label: string
        name: string
        type: string
        placeholder?: string
        disabled?: boolean
        autoFocus?: boolean
        error?: ValidationErrors
        defaultValue?: string
        readOnly?: boolean
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value?: string
    }) {
    return (
        <div className="space-y-3.5">
            <Label>{label}</Label>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                readOnly={readOnly}
                onChange={onChange}
                value={value}
            />
            {error && error[name] &&
                <p className="text-sm text-destructive">{error[name]}</p>
            }
        </div>
    )
}

export default TextField
