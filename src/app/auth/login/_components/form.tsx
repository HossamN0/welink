'use client'

import FormFields from "@/components/form-fields"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import { Forms, Routes } from "@/constants/enums"
import useFormFields from "@/hooks/useFormFields"
import { ValidationErrors } from "@/validation/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

function Form() {

    const [fieldErrors, setFieldErrors] = useState<ValidationErrors | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { getFormFields } = useFormFields({ form: Forms.LOGIN });
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null);
    const onsubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        try {
            setLoading(true)
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            })
            if (res?.error) {
                const error = JSON.parse(res.error)
                setFieldErrors(error?.validationError)
                if (error?.responseError) {
                    toast.error(error?.responseError)
                }
            }
            if (res?.ok) {
                router.replace(`/${Routes.HOME}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form ref={formRef} onSubmit={onsubmit} className="sm:w-[400px] w-72 from-[#212121] to-[#212121] p-8 text-sm text-white flex flex-col gap-5 box-border 
            border-2 border-transparent 
            [background-clip:padding-box,border-box] 
            [background-origin:border-box] 
            [border-image:linear-gradient(145deg,transparent_35%,#e81cff,#40c9ff)_1]">
            <div className="space-y-9">
                {getFormFields()?.map((field, index) =>
                    <FormFields {...field} error={fieldErrors!} key={index} />
                )}
            </div>
            <Button disabled={loading} className="mt-5 transition-all duration-300 ease-in-out" type="submit">
                {loading ? <Loader /> : 'Login'}
            </Button>
        </form>
    )
}

export default Form