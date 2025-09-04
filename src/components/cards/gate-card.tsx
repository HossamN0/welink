import { Gate } from "@/types/api"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

function GateCard({ gate }: { gate: Gate }) {

    const router = useRouter()

    return (
        <li className="relative flex flex-col justify-between gap-4 p-4 md:w-80 w-70 rounded-xl bg-[hsla(240,15%,9%,1)] shadow-[inset_0px_-16px_24px_0px_rgba(255,255,255,0.25)]
  [background-image:radial-gradient(at_88%_40%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_49%_30%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_14%_26%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_0%_64%,hsl(189,99%,26%)_0px,transparent_85%),radial-gradient(at_41%_94%,hsl(189,97%,36%)_0px,transparent_85%),radial-gradient(at_100%_99%,hsl(188,94%,13%)_0px,transparent_85%)]">

            <div className="flex flex-col gap-4">
                <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
                    <div className="fixed top-1/2 left-1/2 w-[200%] h-40 -translate-x-1/2 -translate-y-1/2 
      bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[spin_8s_linear_infinite]" />
                </div>

                <div>
                    <p className="text-white text-base font-semibold">Gate Name : {gate.name}</p>
                    <p className="mt-1 text-[0.6rem] text-gray-400 w-2/3">
                        Gate Location : {gate.location}
                    </p>
                </div>

                <hr className="w-full h-[0.1rem] border-0 bg-gray-800" />
                <h3>Zones :</h3>
                {gate?.zoneIds?.map((zoneId: string) => <Item key={zoneId} item={zoneId} />)}
            </div>
            <Button onClick={() => router.push(`/gate/${gate.id}`)} variant={'cyan'}>Go</Button>
        </li>

    )
}

export default GateCard

function Item({ item }: { item: string }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 bg-cyan-400 rounded-full">
                    <svg
                        className="w-3 h-3 text-black"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 
              1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        />
                    </svg>
                </span>
                <span className="text-white text-sm">{item}</span>
            </p>
        </div>
    )
}