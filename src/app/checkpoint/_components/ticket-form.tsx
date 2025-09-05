'use client'

import TextField from "@/components/form-fields/text-field"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader";
import useFetchData from "@/hooks/useFetchData";
import { getTicketById } from "@/services/api/tickets";
import { ApiError, Ticket } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast";

function TicketForm({ setData, setRefetchFn }: { setData: (data: Ticket | undefined) => void, setRefetchFn: (fn: () => void) => void }) {

    const queryClient = useQueryClient();
    const [ticketId, setTicketId] = useState('');
    const refetchKey = `ticket-${ticketId}`
    const { data, error, isError, isLoading, isFetching, refetch, isSuccess } = useFetchData(refetchKey, () => getTicketById(ticketId), {
        enabled: false
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refetch();
    }

    useEffect(() => {
        if (isError) {
            toast.error((error as ApiError)?.response?.data?.message)
            setData(undefined)
        }
        if (isSuccess) {
            setRefetchFn(() => refetch);
            setData(data)
        }
        queryClient.resetQueries({ queryKey: [refetchKey] });
    }, [isError, data, error, isSuccess, queryClient, refetchKey, refetch, setRefetchFn, setData]);

    return (
        <form onSubmit={handleSubmit} className="border border-l-0 border-r-pink-200 border-cyan-400 rounded-md md:w-1/3 w-full px-5 py-8">
            <TextField onChange={(e: { target: { value: SetStateAction<string> } }) => setTicketId(e.target.value)} value={ticketId} label="Ticket ID" name="ticketId" type="text" placeholder="Ticket ID" />
            <Button disabled={isLoading || isFetching || !ticketId} className="w-full mt-8" variant={"cyan"}>
                {isLoading || isFetching ? <Loader /> : 'Submit'}
            </Button>
        </form>
    )
}

export default TicketForm
