import { Environment } from "@/constants/enums";
import { changeZoneStatus } from "@/services/api/admin";
import { ApiError, ZoneChangeRequest, ZoneChangeResponse } from "@/types/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useChangeZone = () => {
    return useMutation<ZoneChangeResponse, ApiError, ZoneChangeRequest>({
        mutationFn: async (variables) => {
            const response = await changeZoneStatus(variables);
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