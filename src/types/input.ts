export interface IFormField {
    name: string;
    label: string;
    type:
    "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "textarea";
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    options?: Ioption;
    id?: string;
    defaultValue?: string;
    readonly?: boolean;
}

export interface Ioption {
    value: string;
    label: string;
}