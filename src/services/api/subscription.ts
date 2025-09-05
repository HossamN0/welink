import request from "@/lib/axios"
import { Subscription } from "@/types/api"

export const getSubscriptions = ({ id }: { id: string }) => {
    return request<Subscription>({ method: 'get', url: `/subscriptions/${id}` })
}