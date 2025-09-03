'use server'

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
            body: JSON.stringify(credintials)
        })
        if (!res.ok) {
            return {
                status: res.status,
                message: res.statusText
            }
        }
        console.log('main req', res)
    } catch (error) {

    }
}