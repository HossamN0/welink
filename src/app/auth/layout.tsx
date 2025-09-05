import Footer from "@/components/footer"
import Gradiant from "@/components/ui/bg-gradiant"

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full relative z-[1] py-[100px]">
            <Gradiant />
            {children}
            <Footer />
        </main>
    )
}

export default AuthLayout
