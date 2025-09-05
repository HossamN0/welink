import { Environment } from "@/constants/enums"
import { checkin } from "@/services/api/tickets"
import { ApiError, CheckinResponse, CheckinRequest } from "@/types/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCheckin = () => {

    return useMutation<CheckinResponse, ApiError, { data: CheckinRequest }>({
        mutationFn: async (variables) => {
            const response = await checkin(variables);
            return response.data;
        },
        onError: (error: ApiError) => {
            toast.error(error?.response?.data?.message)
            if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
                console.log(error)
            }
        }
    })
}