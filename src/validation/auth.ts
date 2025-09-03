import z from "zod";

export const loginSchema = () => {
    return z.object({
        username: z
            .string()
            .trim()
            .min(1, { message: "Username is required" }),
        password: z
            .string()
            .trim()
            .min(1, { message: "Password is required" })
            .max(20, { message: "Password must be less than 20 characters" }),
    })
}


export type ValidationErrors =
    {
        [key: string]: string[];
    }
    | undefined;
