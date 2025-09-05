import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckinResponse } from "@/types/api"
import TicketAnimation from "./ticket-animation"

function TicketModal({ open, setOpen, data }: { open: boolean, setOpen: (open: boolean) => void, data: { data: CheckinResponse } }) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ticket created successfully</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-[16px] mt-7 *:text-white/50">
                    <p className="font-semibold !text-white/80">Your Ticket :</p>
                    <p>Gate ID : {data?.data?.ticket?.gateId}</p>
                    <p>Zone ID : {data?.data?.ticket?.zoneId}</p>
                    <p>Ticket ID : {data?.data?.ticket?.id}</p>
                    <p>Checkin At : {new Date(data?.data?.ticket?.checkinAt)?.toLocaleString()}</p>
                </div>
                <div className="flex-center">
                    <TicketAnimation data={data} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TicketModal
