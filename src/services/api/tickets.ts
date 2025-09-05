import request from "@/lib/axios"
import { CheckinRequest, CheckinResponse, CheckoutRequest, CheckoutResponse, Ticket } from "@/types/api"

export const checkin = ({ data }: { data: CheckinRequest }) => {
    return request<CheckinResponse>({ method: 'POST', url: `/tickets/checkin`, data })
}

export const getTicketById = (id: string) => {
    return request<Ticket>({ method: 'get', url: `/tickets/${id}` })
}

export const ticketCheckout = ({ data }: { data: CheckoutRequest }) => {
    return request<CheckoutResponse>({ method: 'post', url: `/tickets/checkout`, data })
}