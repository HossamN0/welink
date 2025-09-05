import SubscriptionForm from "@/components/form-fields/subscription-form";
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader";
import { Roles } from "@/constants/enums"
import { useCheckout } from "@/hooks/mutations/useCheckout";
import { Subscription, Ticket } from "@/types/api"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function TicketData({ data, refetchFn }: { data: Ticket | undefined, refetchFn: () => void }) {

    const [verifyData, setVerifyData] = useState<Subscription | undefined>(undefined);
    const queryClient = useQueryClient();
    const checkoutMutation = useCheckout();
    const handleCheckout = ({ forceConvertToVisitor = false }: { forceConvertToVisitor?: boolean }) => {
        if (data?.type === Roles.VISITOR) {
            return checkoutMutation.mutate({ data: { ticketId: data?.id } });
        } else if (data?.type === Roles.SUBSCRIBER) {
            if (forceConvertToVisitor) {
                return checkoutMutation.mutate({ data: { ticketId: data?.id, forceConvertToVisitor: true } });
            }
            return checkoutMutation.mutate({ data: { ticketId: data?.id, subscriptionId: verifyData?.id } });
        }
    }

    useEffect(() => {
        if (checkoutMutation.isSuccess) {
            toast.success('Checked out successfully');
            refetchFn();
            checkoutMutation.reset();
            setVerifyData(undefined);
        }
    }, [checkoutMutation.isSuccess, queryClient, checkoutMutation, refetchFn]);

    return data &&
        (
            <div className="font-semibold text-[14px] md:text-[16px] space-y-2 border rounded-md border-cyan-800 p-5 mt-11 md:w-1/3 w-full">
                <p>Type : {data.type}</p>
                <p>Ticket ID : {data.id}</p>
                <p>Gate ID : {data.gateId}</p>
                <p>Zone ID : {data.zoneId}</p>
                <p>Checkin At : {data.checkinAt ? new Date(data.checkinAt).toLocaleString() : 'N/A'}</p>
                {!data?.checkoutAt &&
                    <>
                        {Roles.SUBSCRIBER === data?.type &&
                            <>
                                <SubscriptionForm setVerifyData={setVerifyData} zone={data} />
                                {(verifyData && data?.type === Roles.SUBSCRIBER) &&
                                    <div>
                                        {verifyData?.cars?.map((car, index: number) =>
                                            <ul key={index} className="space-y-1 text-[14px] font-medium text-white/80 *:mx-5">
                                                <li className="font-bold text-[16px] !mx-0">Car {index + 1} :</li>
                                                <li>Name : {car?.brand} {car?.model}</li>
                                                <li>Color : {car?.color}</li>
                                                <li>Plate : {car?.plate}</li>
                                            </ul>
                                        )}
                                    </div>
                                }
                            </>
                        }
                        <div className={`flex-center ${Roles.SUBSCRIBER === data?.type ? '*:w-1/2' : '*:w-full'} gap-4`}>
                            <Button disabled={(!verifyData && data?.type === Roles.SUBSCRIBER) || checkoutMutation.isPending} onClick={() => handleCheckout({})} variant="cyan" className="mt-3">
                                {checkoutMutation.isPending ? <Loader /> : 'Check out'}
                            </Button>
                            {Roles.SUBSCRIBER === data?.type &&
                                <Button disabled={(!verifyData && data?.type === Roles.SUBSCRIBER) || checkoutMutation.isPending} onClick={() => handleCheckout({ forceConvertToVisitor: true })} variant="cyan" className="mt-3">
                                    {checkoutMutation.isPending ? <Loader /> : 'Check out as a visitor'}
                                </Button>
                            }
                        </div>
                    </>
                }
            </div>
        )
}

export default TicketData
