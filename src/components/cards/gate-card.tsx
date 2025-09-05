import { Gate } from "@/types/api"
import { buttonVariants } from "../ui/button"
import { CircleParking } from "lucide-react"
import Link from "next/link"

function GateCard({ gate }: { gate: Gate }) {

    return (
        <li className="relative flex flex-col justify-between gap-4 p-4 md:w-80 w-70 rounded-xl bg-[hsla(240,15%,9%,1)] shadow-[inset_0px_-16px_24px_0px_rgba(255,255,255,0.25)]
  [background-image:radial-gradient(at_88%_40%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_49%_30%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_14%_26%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_0%_64%,hsl(189,99%,26%)_0px,transparent_85%),radial-gradient(at_41%_94%,hsl(189,97%,36%)_0px,transparent_85%),radial-gradient(at_100%_99%,hsl(188,94%,13%)_0px,transparent_85%)]">

            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-white text-base font-semibold">Gate Name : {gate.name}</p>
                    <p className="mt-1 text-[0.6rem] text-gray-400 w-2/3">
                        Gate Location : {gate.location}
                    </p>
                </div>

                <hr className="w-full h-[0.1rem] border-0 bg-gray-800" />
                <h3>Zones :</h3>
                <ul className="flex flex-col gap-4">
                    {gate?.zoneIds?.map((zoneId: string) => <Item key={zoneId} item={zoneId} />)}
                </ul>
            </div>
            <Link className={`${buttonVariants({ variant: 'cyan', className: 'w-full !rounded-2xl' })}`} href={`/gate/${gate.id}`}>Go</Link>
        </li>

    )
}

export default GateCard

function Item({ item }: { item: string }) {
    return (
        <li className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 bg-cyan-400 rounded-full">
                    <CircleParking className="text-black font-medium" />
                </span>
                <span className="text-white text-sm">{item}</span>
            </p>
        </li>
    )
}