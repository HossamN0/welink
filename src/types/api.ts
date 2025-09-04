export interface Gate {
    id: number
    name: string
    location: string
    zoneIds: string[]
}

export interface Zone {
    availableForSubscribers: number
    availableForVisitors: number
    categoryId: string
    free: number
    gateIds: string[]
    id: string
    name: string
    occupied: number
    open: boolean
    rateNormal: number
    rateSpecial: number
    reserved: number
    totalSlots: number
}
