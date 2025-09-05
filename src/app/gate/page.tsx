'use client'

import GateCard from "@/components/cards/gate-card"
import Gradiant from "@/components/ui/bg-gradiant"
import Loader from "@/components/ui/loader"
import useFetchData from "@/hooks/useFetchData"
import { GetGates } from "@/services/api/gate"
import { Gate } from "@/types/api"

function GatePage() {

    const { data, isLoading } = useFetchData('gates', GetGates)

    return (
        <main className="pb-20 pt-15 relative flex-center z-[1]">
            <Gradiant />
            {isLoading ?
                <Loader />
                :
                data?.data?.length > 0 ?
                    <div className="content-container">
                        <h2 className="text-2xl font-bold mb-9">All Gates</h2>
                        <ul className="grid lg:grid-cols-3 md:grid-cols-2 justify-center gap-4 gap-y-15">
                            {data?.data?.map((gate: Gate) => (
                                <GateCard key={gate.id} gate={gate} />
                            ))}
                        </ul>
                    </div>
                    :
                    <div className="not-found">
                        No Gates Found
                    </div>
            }
        </main>
    )
}

export default GatePage
