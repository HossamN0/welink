import useFetchData from '@/hooks/useFetchData';
import { getSubscriptions } from '@/services/api/subscription';
import { ApiError } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Subscription } from '@/types/api';
import Loader from '../ui/loader';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function SubscriptionForm({
    setVerifyData,
    zone,
    showToast = false
}: {
    setVerifyData: React.Dispatch<React.SetStateAction<Subscription | undefined>>,
    zone: { id: string },
    showToast?: boolean
}) {

    const queryClient = useQueryClient();
    const [id, setId] = useState('');
    const { data, isLoading, isFetching, error, isError, refetch } = useFetchData<Subscription>(`verify-${zone.id}`, () => getSubscriptions({ id }), { enabled: false, retry: false });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refetch();
    }

    useEffect(() => {
        if (isError) {
            toast.error((error as ApiError)?.response?.data?.message);
            setVerifyData(undefined);
        }
        if (data) {
            const subscriptionId = data?.id;
            if (subscriptionId) {
                if (showToast) {
                    toast.success(`All Zones With ${data?.category} Subscription Are Open For You`, { duration: 5000 });
                }
                setVerifyData(data);
            }
        }
        queryClient.resetQueries({ queryKey: [`verify-${zone.id}`] });
    }, [isError, data, error, id, queryClient, setVerifyData, zone.id, showToast]);

    return (
        <form onSubmit={handleSubmit} action="" className="mb-4">
            <div className="bg-gray-800 rounded-md p-2 flex items-center justify-between">
                <Input onChange={(e) => setId(e.target.value)} value={id} name="subscriptionId" placeholder="subscription Id" className="border-none p-0" />
                <Button disabled={!id || isLoading || isFetching} type="submit" variant={'cyan'} className="rounded-md">
                    {(isLoading || isFetching) ? <Loader /> : 'Verify'}
                </Button>
            </div>
        </form>
    )
}

export default SubscriptionForm
