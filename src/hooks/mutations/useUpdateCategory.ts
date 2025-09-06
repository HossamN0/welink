import { Environment } from "@/constants/enums";
import { UpdateCategory } from "@/services/api/admin";
import { ApiError, Category, CategoryUpdateRequest } from "@/types/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useUpdateCategory = () => {
    return useMutation<Category, ApiError, { id: string, data: CategoryUpdateRequest }>({
        mutationFn: async (variables) => {
            const response = await UpdateCategory(variables);
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