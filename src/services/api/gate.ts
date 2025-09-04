import request from "@/lib/axios"

export const GetGates = () => {
    return request({ method: 'get', url: `/master/gates` })
}

export const GetGateById = (id: string) => {
    return request({ method: 'get', url: `/master/zones?gateId=${id}` })
}