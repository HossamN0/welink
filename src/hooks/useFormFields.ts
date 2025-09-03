import { Forms } from "@/constants/enums"
import { IFormField } from "@/types/input"

const useFormFields = ({ form }: { form: string }) => {

    const loginForm = (): IFormField[] => [
        {
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: "Your username",
            autoFocus: true
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: "Your password",
        }
    ]

    const getFormFields = (): IFormField[] => {
        switch (form) {
            case Forms.LOGIN:
                return loginForm();
            default:
                return [];
        }
    }

    return { getFormFields }
}

export default useFormFields
