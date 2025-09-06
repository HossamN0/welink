import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckinResponse } from "@/types/api"
import TicketAnimation from "./ticket-animation"

interface TicketModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    data?: CheckinResponse;
}

function TicketModal({ open, setOpen, data }: TicketModalProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left text-[16px] md:text-[20px] text-white">Ticket created successfully</DialogTitle>
                </DialogHeader>
                {data && (
                    <>
                        <div className="space-y-3 md:text-[16px] text-[14px] mt-7 *:text-white/50">
                            <p className="font-semibold !text-white/80">Your Ticket :</p>
                            <p>Gate ID : {data.ticket?.gateId}</p>
                            <p>Zone ID : {data.ticket?.zoneId}</p>
                            <p>Ticket ID : {data.ticket?.id}</p>
                            <p>Checkin At : {data.ticket?.checkinAt ? new Date(data.ticket.checkinAt).toLocaleString() : 'N/A'}</p>
                        </div>
                        <div className="flex-center">
                            <TicketAnimation data={data} />
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default TicketModal
