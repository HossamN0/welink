'use client'

import Link from "@/components/link"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Pages, Routes } from "@/constants/enums"
import { Home, SquareParking, UserStar } from "lucide-react"
import { usePathname } from "next/navigation"

const items = [
    {
        title: "Home",
        url: `/${Routes.HOME}`,
        icon: Home,
    },
    {
        title: "Parking State Report",
        url: `/${Routes.ADMIN}/${Pages.PARKING}`,
        icon: SquareParking,
    },
    {
        title: "Control Panel",
        url: `/${Routes.ADMIN}/${Pages.CONTROL}`,
        icon: UserStar,
    }
]

function AdminSidebar() {

    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={`${pathname === item.url ? "bg-cyan-400 text-black" : ""} hover:!bg-cyan-200 hover:!text-black text-[14px] font-medium`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AdminSidebar
