'use client'

import FormFields from "@/components/form-fields"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { Forms } from "@/constants/enums"
import { useUpdateCategory } from "@/hooks/mutations/useUpdateCategory"
import useFetchData from "@/hooks/useFetchData"
import useFormFields from "@/hooks/useFormFields"
import { GetCategories } from "@/services/api/admin"
import { Category, CategoryUpdateRequest } from "@/types/api"
import { IFormField } from "@/types/input"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import toast from "react-hot-toast"

function CategoryPage() {

    const refetchKey = `categories`
    const { data, isLoading } = useFetchData(refetchKey, GetCategories)

    return (
        <section className="min-h-screen flex-center mx-auto flex-col">
            {isLoading ?
                <Loader />
                :
                Array.isArray(data) && data?.length > 0 ?
                    <ul className="grid xl:grid-cols-4 lg:grid-cols-3 justify-center gap-4 gap-y-8">
                        {data.map((category: Category) =>
                            <CategoryCard key={category.id} category={category} refetch={refetchKey} />
                        )}
                    </ul>
                    :
                    <div className="not-found">
                        No Categories Found
                    </div>
            }
        </section>
    )
}

export default CategoryPage


const CategoryCard = ({ category, refetch }: { category: Category; refetch: string }) => {

    const queryClient = useQueryClient()
    const { getFormFields } = useFormFields({ form: Forms.CATEGORY });
    const updateMutation = useUpdateCategory()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: CategoryUpdateRequest = {
            rateNormal: Number(formData.get('rateNormal')),
            rateSpecial: Number(formData.get('rateSpecial'))
        }
        updateMutation.mutate({ id: category.id, data })
    }

    useEffect(() => {
        if (updateMutation.isSuccess) {
            toast.success('Category Updated Successfully');
            queryClient.refetchQueries({ queryKey: [refetch] });
        }
    }, [updateMutation.isSuccess, queryClient, refetch])

    return (
        <li className="border border-cyan-800 rounded-md p-5">
            <p className="mb-11">Name : {category.name}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                {getFormFields().map((field: IFormField) => {
                    const rate = field?.name === 'rateNormal' ? category.rateNormal || 0 : category.rateSpecial || 0
                    return (
                        <FormFields key={field.name} {...field} defaultValue={rate?.toString()} />
                    )
                })}
                <Button disabled={updateMutation.isPending} variant={'cyan'} className="w-full mt-5">
                    {updateMutation.isPending ? <Loader /> : 'Update'}
                </Button>
            </form>
        </li>
    )
}