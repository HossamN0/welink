import { Environment } from "@/constants/enums";
import { ticketCheckout } from "@/services/api/tickets"
import { ApiError, CheckoutRequest, CheckoutResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCheckout = () => {
    return useMutation<CheckoutResponse, ApiError, { data: CheckoutRequest }>({
        mutationFn: async (variables) => {
            const response = await ticketCheckout(variables);
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