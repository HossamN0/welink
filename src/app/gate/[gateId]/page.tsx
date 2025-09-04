'use client'

import useFetchData from "@/hooks/useFetchData"
import GateHeader from "./_components/header"
import { GetGateById } from "@/services/api/gate"
import { useParams } from "next/navigation"
import GateToggle from "./_components/toggle"
import { useState } from "react"
import Gradiant from "@/components/ui/bg-gradiant"
import { Zone } from "@/types/api"
import ZoneCard from "@/components/cards/zone-card"

function PageGateId() {

    const [role, setRole] = useState<'subscriber' | 'visitor'>('visitor');
    const { gateId }: { gateId: string } = useParams()
    const { data } = useFetchData(`gate-${gateId}`, () => GetGateById(gateId))

    return (
        <main>
            <GateHeader gateId={gateId} />
            <section className="content-container py-11 flex-center flex-col relative z-[1]">
                <Gradiant />
                <GateToggle role={role} setRole={setRole} />
                <div className="min-h-screen flex-center">
                    {data?.data?.length > 0 ?
                        <div className="grid lg:grid-cols-2 gap-4 mt-11">
                            {data?.data?.map((zone: Zone) =>
                                <ZoneCard input={role === 'subscriber'} zone={zone} key={zone.id} />
                            )}
                        </div>
                        :
                        <div className="not-found">
                            No Zones Found
                        </div>
                    }
                </div>
            </section>
        </main>
    )
}

export default PageGateId
