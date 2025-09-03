import Link from "@/components/link"
import { Routes } from "@/constants/enums"

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen w-full relative bg-black z-[1] py-[100px]">
            <div
                className="absolute inset-0 -z-[1]"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
                }}
            />
            {children}
            <div className="w-11/12 mx-auto">
                <div className="h-0.5 bg-white/10 mt-14 mb-4 "></div>
                <div className="flex items-center justify-between *:opacity-50">
                    <Link href={`/${Routes.HOME}`} className="hover:opacity-100">Home Page</Link>
                    <p className="text-[12px]">&copy; 2025 All rights reserved</p>
                </div>
            </div>
        </main>
    )
}

export default AuthLayout
