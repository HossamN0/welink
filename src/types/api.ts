import { Roles } from "@/constants/enums"

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


export interface ApiError {
    response: { data: { message: string, status: string } }
    status: number
}


export interface Ticket {
    id: string
    type: Roles.VISITOR | Roles.SUBSCRIBER
    zoneId: string
    gateId: string
    checkinAt: string
    checkoutAt: string | null
}

export interface CheckinResponse {
    ticket: Ticket
    zoneState: Zone
}

export interface Subscription {
    id: string;
    userName: string;
    active: boolean;
    category: string;
    cars: Car[];
    startsAt: string;
    expiresAt: string;
    currentCheckins: CheckinResponse[];
}

export interface Car {
    plate: string;
    brand: string;
    model: string;
    color: string;
}