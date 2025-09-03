import { Environment, Pages, Routes } from "@/constants/enums";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./_actions/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credintials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            authorize: async (credintials: { username: string, password: string }) => {
                const res = await login(credintials);
                if (res?.status === 200) {
                    return res
                } else {
                    throw new Error(
                        JSON.stringify({
                            validationError: res?.validation,
                            responseError: res?.message,
                        })
                    )
                }
            }
        })
    ],
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: Environment.DEVELOPMENT === process.env.NODE_ENV
}