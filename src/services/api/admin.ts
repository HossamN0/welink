import request from "@/lib/axios"
import { Category, CategoryUpdateRequest, Zone, ZoneChangeRequest, ZoneChangeResponse } from "@/types/api"

export const getParkingState = () => {
    return request<Zone[]>({ method: 'get', url: `/admin/reports/parking-state` })
}

export const changeZoneStatus = ({ id, status }: ZoneChangeRequest) => {
    return request<ZoneChangeResponse>({ method: 'put', url: `/admin/zones/${id}/open`, data: { open: status } })
}

export const GetCategories = () => {
    return request<Category[]>({ method: 'get', url: `/master/categories` })
}

export const UpdateCategory = ({ id, data }: { id: string, data: CategoryUpdateRequest }) => {
    return request<{ id: string, name: string }>({ method: 'put', url: `/admin/categories/${id}`, data })
}