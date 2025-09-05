import request from "@/lib/axios"

export const checkin = ({ data }: { data: { gateId: string, zoneId: string, type: string, subscriptionId?: string } }) => {
    return request({ method: `POST`, url: `/tickets/checkin`, data })
}
