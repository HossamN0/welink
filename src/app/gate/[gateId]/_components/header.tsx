import { useEffect, useState } from "react"

function GateHeader({ gateId }: { gateId: string }) {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <header className="group bg-header py-7.5 relative overflow-hidden text-gold z-[1]">
            <div className="-z-[1] rotate-3 opacity-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-400 ease-in-out absolute w-[calc(100%-20px)] h-[calc(100%-20px)] left-1/2 top-1/2 -translate-1/2 border-2 border-gold "></div>

            <div className="content-container flex items-center justify-between">
                <p>Gate ID : {gateId}</p>
                <p>connected to : websocket</p>
                <p>current time : {time.toLocaleString()}</p>
            </div>
        </header>
    )
}

export default GateHeader
