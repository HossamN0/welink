'use server'

import { Environment } from "@/constants/enums"
import { loginSchema } from "@/validation/auth"
import z from "zod"

export const login = async (credintials: { username: string, password: string }) => {
    const result = loginSchema().safeParse(credintials)
    const error = result.error ? z.flattenError(result.error).fieldErrors : undefined

    if (error) {
        return {
            validation: error,
            status: 400
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: credintials.username,
                password: credintials.password
            })
        });
        const data = await res.json();
        if (!res.ok) {
            return {
                status: res.status,
                message: data?.message || res?.statusText
            }
        }
        return {
            status: 200,
            ...data
        }
    } catch (error) {
        console.log(error)
    }
}