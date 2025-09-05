import request from "@/lib/axios"
import { Zone, Gate } from "@/types/api"

export const GetGates = () => {
    return request<Gate[]>({ method: 'get', url: `/master/gates` })
}

export const GetGateById = (id: string) => {
    return request<Zone[]>({ method: 'get', url: `/master/zones?gateId=${id}` })
}