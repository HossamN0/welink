import { ApiStatus, RateMode, Roles } from "@/constants/enums"

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
    response: {
        data: {
            message: string
            status: string
            code?: string
        }
    }
    status: number
    message: string
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

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: ApiStatus.SUCCESS | ApiStatus.ERROR;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CheckinRequest {
    gateId: string;
    zoneId: string;
    type: Roles.VISITOR | Roles.SUBSCRIBER;
    subscriptionId?: string;
}

export interface SubscriptionVerificationRequest {
    id: string;
}

export interface BreakdownSegment {
    from: string;
    to: string;
    hours: number;
    rateMode: RateMode.NORMAL | RateMode.SPECIAL;
    rate: number;
    amount: number;
}

export interface CheckoutResponse {
    ticketId: string;
    checkinAt: string;
    checkoutAt: string;
    durationHours: number;
    breakdown: BreakdownSegment[];
    amount: number;
    zoneState: Zone;
}

export interface CheckoutRequest {
    ticketId: string;
    subscriptionId?: string;
    forceConvertToVisitor?: boolean;
}