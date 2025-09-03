import { Environment, Pages, Routes } from "@/constants/enums";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./_actions/auth";

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        role: string;
        token: string;
    }
    interface Session {
        user: User;
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id;
                token.username = user?.username;
                token.role = user?.role;
                token.token = user?.token;
            }
            return token;
        },
        async session({ token, session }) {
            session.user.id = token.id as string;
            session.user.username = token.username as string;
            session.user.role = token.role as string;
            session.user.token = token.token as string;
            return session
        }
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            authorize: async (credentials) => {
                const res = await login(credentials!);
                if (res?.status === 200) {
                    return {
                        id: res?.user?.id,
                        username: res?.user?.username,
                        role: res?.user?.role,
                        token: res?.token
                    }
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