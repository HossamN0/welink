import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Sidebar from "./_components/sidebar"
import Gradiant from "@/components/ui/bg-gradiant"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar />
            <main className="w-full z-[1] pb-9 pt-3">
                <SidebarTrigger />
                <Gradiant />
                <div className="content-container">
                    {children}
                </div>
            </main>
        </SidebarProvider>

    )
}