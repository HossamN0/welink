import { Subscription, Zone } from "@/types/api"
import { Button } from "../ui/button"
import { DoorClosedLocked } from "lucide-react"
import { correct } from "../icons"
import { Roles } from "@/constants/enums"
import Loader from "../ui/loader"
import SubscriptionForm from "../form-fields/subscription-form"
import { memo } from "react"

const ZoneCard = memo(function ZoneCard({
    verifyData,
    setVerifyData,
    loading,
    clickFunc,
    type,
    zone,
    closed
}: {
    verifyData: Subscription | undefined,
    setVerifyData: React.Dispatch<React.SetStateAction<Subscription | undefined>>,
    loading: boolean,
    clickFunc: ({ zoneId }: { zoneId: string }) => void,
    type: string,
    zone: Zone,
    closed: boolean
}) {

    return (
        <>
            <li className="relative flex flex-col justify-between gap-4 p-4 md:w-110 w-70 rounded-xl bg-[hsla(240,15%,9%,1)] shadow-[inset_0px_-16px_24px_0px_rgba(255,255,255,0.25)]
  [background-image:radial-gradient(at_88%_40%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_49%_30%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_14%_26%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_0%_64%,hsl(189,99%,26%)_0px,transparent_85%),radial-gradient(at_41%_94%,hsl(189,97%,36%)_0px,transparent_85%),radial-gradient(at_100%_99%,hsl(188,94%,13%)_0px,transparent_85%)]">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-white text-base font-semibold">Gate Name : {zone.name}</p>
                        <p className="mt-1 text-[0.6rem] text-gray-400 w-2/3">
                            Gate Location : {zone.categoryId}
                        </p>
                    </div>

                    <hr className="w-full h-[0.1rem] border-0 bg-gray-800" />
                    <p className="text-[14px] space-x-2">
                        <span>occupied: {zone.occupied}</span> / <span>capacity: {zone.free}</span> / <span>reserved: {zone.reserved}</span>
                    </p>
                    <p>available for visitors: {zone.availableForVisitors}</p>
                    <p>available for subscribers: {zone.availableForSubscribers}</p>
                    <p>
                        <span>rate normal: {zone.rateNormal}</span> / <span>rate special: {zone.rateSpecial}</span>
                    </p>
                    <p className="flex items-center gap-3">{zone.open ? <>{correct} open</> : 'closed'}</p>
                    <h3>Gates :</h3>
                    <ul className="flex flex-col gap-4">
                        {zone?.gateIds?.map((gateId: string) => <Item key={gateId} item={gateId} />)}
                    </ul>
                </div>
                <div>
                    {type === Roles.SUBSCRIBER &&
                        <SubscriptionForm showToast={true} setVerifyData={setVerifyData} zone={zone} />
                    }
                    <Button
                        disabled={loading || (type === Roles.SUBSCRIBER && (!verifyData?.id || verifyData?.category !== zone.categoryId)) || closed}
                        onClick={() => clickFunc({ zoneId: zone.id })}
                        variant={'cyan'}
                        className="w-full"
                    >
                        {loading ? <Loader /> : closed ? 'Closed Zone' : 'Go'}
                    </Button>
                </div>
            </li>
        </>
    )
});

export default ZoneCard

function Item({ item }: { item: string }) {
    return (
        <li className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-400 rounded-full overflow-visible">
                    <DoorClosedLocked className="font-medium text-black" />
                </span>
                <span className="text-white text-sm">{item}</span>
            </p>
        </li>
    )
}