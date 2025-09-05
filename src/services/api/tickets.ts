import request from "@/lib/axios"
import { CheckinRequest, CheckinResponse } from "@/types/api"

export const checkin = ({ data }: { data: CheckinRequest }) => {
    return request<CheckinResponse>({ method: 'POST', url: `/tickets/checkin`, data })
}
