import { InputTypes } from "@/constants/enums";
import { IFormField } from "@/types/input";
import { ValidationErrors } from "@/validation/auth";
import React from "react";
import TextField from "./text-field";
import PasswordField from "./password-field";
import '@/styles/inputs.css'

interface Props extends IFormField {
    error?: ValidationErrors
}

function FormFields(props: Props) {
    const { type } = props;

    const renderField = (): React.ReactNode => {
        switch (type) {
            case InputTypes.TEXT:
            case InputTypes.NUMBER:
                return <TextField {...props} />
            case InputTypes.PASSWORD:
                return <PasswordField {...props} />
            default:
                <></>
        }
    }

    return <>{renderField()}</>
}

export default FormFields
