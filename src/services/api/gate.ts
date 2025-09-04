import request from "@/lib/axios"

export const GetGates = ({ filters }: { filters?: string }) => {
    return request({ method: 'get', url: `/master/gates${filters ? `?${filters}` : ''}` })
}