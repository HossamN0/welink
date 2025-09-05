import { Environment } from "@/constants/enums"
import { checkin } from "@/services/api/tickets"
import { ApiError } from "@/types/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCheckin = () => {

    return useMutation({
        mutationFn: checkin,
        onError: (error: ApiError) => {
            toast.error(error?.response?.data?.message)
            if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
                console.log(error)
            }
        }
    })
}