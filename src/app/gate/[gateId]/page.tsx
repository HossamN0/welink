'use client'

import useFetchData from "@/hooks/useFetchData"
import GateHeader from "./_components/header"
import { GetGateById, GetGates } from "@/services/api/gate"
import { useParams } from "next/navigation"
import GateToggle from "./_components/toggle"
import { useState } from "react"

function PageGateId() {

    const [role, setRole] = useState<'subscriber' | 'visitor'>('visitor');
    const { gateId }: { gateId: string } = useParams()
    const { data } = useFetchData(`gate-${gateId}`, () => GetGateById(gateId))
    console.log(data)

    return (
        <main>
            <GateHeader gateId={gateId} />
            <section className="content-container flex-col flex-center">
                <GateToggle setRole={setRole} />
            </section>
        </main>
    )
}

export default PageGateId
