'use client'

import Orb from "@/components/backgrounds/orb"
import Link from "@/components/link"
import { Button, buttonVariants } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { Pages, Roles, Routes } from "@/constants/enums"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

function HeroSection({ session }: { session: any }) {

    const [loading, setLoading] = useState<boolean>(false);
    const user = session?.user
    const router = useRouter();
    const routeDependonRole = user?.role === Roles.ADMIN ? Routes.ADMIN : user?.role === Roles.EMPLOYEE ? Routes.CHECKPOINT : Routes.GATE
    const textDependonRole = user?.role === Roles.ADMIN ? 'Dashboard' : user?.role === Roles.EMPLOYEE ? 'Checkpoint' : 'Gate'
    const handleAuthClick = async () => {
        if (user) {
            setLoading(true)
            await signOut({
                callbackUrl: `/${Routes.HOME}`,
                redirect: false
            })
            setLoading(false)
            router.refresh()
        } else {
            router.push(`/${Routes.AUTH}/${Pages.LOGIN}`)
        }
    }


    return (
        <section className="relative z-[1] min-h-screen flex-center flex-col content-container overflow-hidden">
            <div className="absolute top-9 left-0 w-full h-full -z-[1]">
                <Orb
                    hoverIntensity={2}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                />
            </div>
            <div>
                <h1 className="font-bold text-5xl text-center leading-15">Welcome <br /> to parking services</h1>
                <div className="flex-center gap-3.5 mt-9 *:rounded-4xl *:text-[16px] *:min-w-36 *:py-5">
                    <Button disabled={loading} onClick={handleAuthClick} variant={'white'} className="">
                        {loading ? <Loader color={'border-black'} /> : user ? 'Logout' : 'Login'}
                    </Button>
                    <Link href={`/${routeDependonRole}`} className={`${buttonVariants({ variant: 'glassy' })}`}>
                        go to {textDependonRole}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
