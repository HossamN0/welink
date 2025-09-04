import Link from "@/components/link"
import Gradiant from "@/components/ui/bg-gradiant"
import { Routes } from "@/constants/enums"

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full relative z-[1] py-[100px]">
            <Gradiant />
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
