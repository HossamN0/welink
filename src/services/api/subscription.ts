import request from "@/lib/axios"

export const getSubscriptions = ({ id }: { id: string }) => {
    return request({ method: 'get', url: `/subscriptions/${id}` })
}