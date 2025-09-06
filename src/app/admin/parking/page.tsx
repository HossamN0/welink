'use client'

import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { useChangeZone } from "@/hooks/mutations/useChangeZone"
import useFetchData from "@/hooks/useFetchData"
import { getParkingState } from "@/services/api/admin"
import { ApiError, Zone, ZoneChangeRequest } from "@/types/api"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import toast from "react-hot-toast"

function ParkingPage() {

    const refetchKey = `parking-state`
    const { data, isLoading } = useFetchData(refetchKey, getParkingState);

    return (
        <section className="min-h-screen flex-center mx-auto flex-col">
            {isLoading ?
                <Loader />
                :
                (Array.isArray(data) && data?.length > 0 ?
                    <ul className="grid xl:grid-cols-3 lg:grid-cols-2 justify-center gap-4 gap-y-8">
                        {data.map((zone: Zone, index: number) =>
                            <AdminZoneCard refetch={refetchKey} key={index} zone={zone} />
                        )}
                    </ul>
                    :
                    <div className="not-found">
                        No Zones Found
                    </div>
                    )
            }
        </section>
    )
}

export default ParkingPage


const AdminZoneCard = ({ zone, refetch }: { zone: Zone, refetch: string }) => {

    const queryClient = useQueryClient();
    const statusMutation = useChangeZone()
    const handleZoneChange = ({ status, id }: { status: boolean, id: string }) => {
        const data: ZoneChangeRequest = {
            id,
            status: !status
        }
        statusMutation.mutate(data)
    }

    useEffect(() => {
        if (statusMutation.isSuccess) {
            queryClient.refetchQueries({ queryKey: [refetch] });
            toast.success('Zone Status Changed Successfully')
        }
        if (statusMutation.isError) {
            toast.error((statusMutation.error as ApiError)?.response?.data?.message)
        }
    }, [statusMutation.isSuccess, statusMutation.isError, statusMutation.error, queryClient, refetch])

    return (
        <li className="border-2 border-cyan-400 rounded-md p-5">
            <p>Gate Name : {zone.name}</p>
            <p>Free Slots : {zone.free}</p>
            <p>Occupied Slots : {zone.occupied}</p>
            <p>Total Slots : {zone.totalSlots}</p>
            <p>Zone Available For Subscribers : {zone.availableForSubscribers}</p>
            <p>Zone Available For Visitors : {zone.availableForVisitors}</p>
            <p>Zone Reserved : {zone.reserved}</p>
            <p>Zone Status : <span className={`${zone.open ? 'text-green-500' : 'text-red-500'}`}> {zone.open ? 'Open' : 'Closed'}</span></p>
            <Button onClick={() => handleZoneChange({ status: zone.open, id: zone.zoneId! })} className="w-full mt-4 rounded-2xl " variant={'glassy'}>
                {zone.open ? 'Close Zone' : 'Open Zone'}
            </Button>
        </li>
    )
}