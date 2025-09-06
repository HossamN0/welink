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

    const categoryForm = (): IFormField[] => [
        {
            label: 'Rate Normal',
            name: 'rateNormal',
            type: 'number',
            placeholder: "Rate Normal",
        },
        {
            label: 'Rate Special',
            name: 'rateSpecial',
            type: 'number',
            placeholder: "Rate Special",
        }
    ]

    const getFormFields = (): IFormField[] => {
        switch (form) {
            case Forms.LOGIN:
                return loginForm();
            case Forms.CATEGORY:
                return categoryForm();
            default:
                return [];
        }
    }

    return { getFormFields }
}

export default useFormFields
