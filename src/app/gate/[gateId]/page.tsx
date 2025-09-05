'use client'

import useFetchData from "@/hooks/useFetchData"
import GateHeader from "./_components/header"
import { GetGateById } from "@/services/api/gate"
import { notFound, useParams } from "next/navigation"
import GateToggle from "./_components/toggle"
import { useEffect, useState } from "react"
import Gradiant from "@/components/ui/bg-gradiant"
import { Zone } from "@/types/api"
import ZoneCard from "@/components/cards/zone-card"
import { Roles } from "@/constants/enums"
import TicketModal from "./_components/ticket-modal"
import { useCheckin } from "@/hooks/mutations/useCheckin"
import { useSelector } from "react-redux"
import { PersistSlice } from "@/store/reducers/persist-slice"
import Loader from "@/components/ui/loader"

function PageGateId() {

    const [role, setRole] = useState<Roles.SUBSCRIBER | Roles.VISITOR>(Roles.VISITOR);
    const [zoneId, setZoneId] = useState<string>('');
    const [verifyId, setVerifyId] = useState('');
    const { gateId }: { gateId: string } = useParams()
    const { data, isLoading } = useFetchData(`gate-${gateId}`, () => GetGateById(gateId))
    const checkinMutation = useCheckin()
    const { connected, ws } = useSelector((state: { PersistSlice: PersistSlice }) => state?.PersistSlice?.websocket || {});
    const handleGo = ({ zoneId }: { zoneId: string }) => {
        setZoneId(zoneId)
        const data = {
            gateId: gateId,
            zoneId: zoneId,
            type: role,
            ...role === Roles.SUBSCRIBER ? { subscriptionId: verifyId } : {}
        }
        checkinMutation.mutate({ data })
    }

    useEffect(() => {
        // should handle it by error status 400 but request status always 200
        if (data?.data?.length == 0) {
            notFound()
        }
    }, [data])
    return (
        <main>
            <TicketModal open={checkinMutation.isSuccess} setOpen={checkinMutation.reset} data={checkinMutation.data} />
            <GateHeader gateId={gateId} />
            <section className="content-container py-11 flex-center flex-col relative z-[1]">
                <Gradiant />
                <GateToggle role={role} setRole={setRole} />
                <div className="min-h-screen flex-center">
                    {isLoading ?
                        <Loader />
                        :
                        data?.data?.length > 0 ?
                            <ul className="grid lg:grid-cols-2 gap-4 mt-11">
                                {data?.data?.map((zone: Zone) =>
                                    <ZoneCard
                                        verifyId={verifyId}
                                        setVerifyId={setVerifyId}
                                        loading={(checkinMutation.isPending && zoneId === zone.id)}
                                        clickFunc={handleGo}
                                        type={role}
                                        zone={zone}
                                        key={zone.id}
                                    />
                                )}
                            </ul>
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
