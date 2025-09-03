import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ValidationErrors } from "@/validation/auth"
import { Eye, EyeOff } from "lucide-react"

function PasswordField(
    {
        label,
        name,
        placeholder,
        disabled,
        autoFocus,
        error,
        defaultValue,
    }: {
        label: string
        name: string
        placeholder?: string
        disabled?: boolean
        autoFocus?: boolean
        error?: ValidationErrors
        defaultValue?: string
    }) {

    const [showpassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPassword(!showpassword);
    }
    return (
        <div className="space-y-3.5">
            <Label>{label}</Label>
            <div className="relative">
                <Input
                    name={name}
                    type={showpassword ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    defaultValue={defaultValue}
                />
                <button type="button" className="*:w-5 *:h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword}>
                    {showpassword ?
                        <EyeOff />
                        :
                        <Eye />
                    }
                </button>
            </div>
            {error && error[name] &&
                <p className="text-sm text-destructive">{error[name]}</p>
            }
        </div>
    )
}

export default PasswordField
