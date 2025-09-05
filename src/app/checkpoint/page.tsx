'use client'

import Gradiant from "@/components/ui/bg-gradiant"
import TicketForm from "./_components/ticket-form"
import { useState } from "react";
import TicketData from "./_components/ticket-data";
import { Ticket } from "@/types/api";

function CheckpointPage() {

    const [ticketData, setTicketData] = useState<Ticket | undefined>(undefined);
    const [refetchFn, setRefetchFn] = useState<() => void>(() => () => { });
    return (
        <main className="relative z-[1]">
            <Gradiant />
            <div className="min-h-screen flex-center flex-col">
                <TicketForm setData={setTicketData} setRefetchFn={setRefetchFn} />
                <TicketData data={ticketData} refetchFn={refetchFn} />
            </div>
        </main>
    )
}

export default CheckpointPage
