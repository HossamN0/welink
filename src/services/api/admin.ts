import request from "@/lib/axios"
import { Zone, ZoneChangeRequest, ZoneChangeResponse } from "@/types/api"

export const getParkingState = () => {
    return request<Zone[]>({ method: 'get', url: `/admin/reports/parking-state` })
}

export const changeZoneStatus = ({ id, status }: ZoneChangeRequest) => {
    return request<ZoneChangeResponse>({ method: 'put', url: `/admin/zones/${id}/${status}` })
}