import '@/styles/ticket-animation.css'
import { CheckinResponse } from '@/types/api'

function TicketAnimation({ data }: { data: CheckinResponse }) {
    return (
        <div className="perspective-[1000px] mt-11">
            <div className="relative h-[150px] md:w-[320px] w-[250px] flex gap-4 rounded-xl bg-white text-[#2d2d2d] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.25)] animate-[cardAnim_10s_infinite] hover:[animation-play-state:paused]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="150"
                    viewBox="0 0 64 150"
                    fill="black"
                >
                </svg>

                <div className="absolute left-[50px] top-0 flex h-full w-4 flex-col items-center justify-center z-10">
                    <span className="relative flex h-full border-l-2 border-dashed border-[#e8e8e8]">
                        <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#e8e8e8]" />
                        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#e8e8e8]" />
                    </span>
                </div>

                <div className="relative flex w-full justify-between">
                    <div className="absolute top-0 right-0 h-full w-[200px] translate-x-[200px] scale-[1.5] blur-[10px] bg-gradient-to-l from-black/80 to-transparent animate-[shadowAnim_10s_infinite]" />
                    <div className="absolute top-0 left-[-100px] h-full w-[80px] -translate-x-[100px] scale-[1.5] rotate-[20deg] bg-gradient-to-r from-transparent via-white to-transparent animate-[lightAnim_10s_infinite]" />

                    <div className="flex w-full flex-col justify-between gap-1 p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <p className="text-[10px] leading-none text-[#aeaeae]">Type</p>
                                <p className="font-bold text-[#2d2d2d]">{data?.ticket?.type}</p>
                            </div>
                            <svg
                                className="shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="#aeaeae"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="m18 8l4 4l-4 4M2 12h20"
                                />
                            </svg>
                            <div className="flex flex-col">
                                <p className="text-[10px] leading-none text-[#aeaeae]">Ticket Category</p>
                                <p className="font-bold text-[#2d2d2d]">{data?.zoneState?.categoryId}</p>
                            </div>
                        </div>

                        <div className="border-b-2 border-[#e8e8e8]" />

                        <div className="flex flex-col gap-1 pb-1">
                            <div className="flex justify-between gap-1">
                                <div className="text-[10px] leading-3">
                                    <p className="text-[#aeaeae]">ID</p>
                                    <p className="font-medium text-[#212121]">{data?.ticket?.id}</p>
                                </div>
                                <div className="text-[10px] leading-3">
                                    <p className="text-[#aeaeae]">Checkin At</p>
                                    <p className="font-medium text-[#212121]">{new Date(data?.ticket?.checkinAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex justify-between gap-1">
                                <div className="text-[10px] leading-3">
                                    <p className="text-[#aeaeae]">Gate</p>
                                    <p className="font-medium text-[#212121]">{data?.ticket?.gateId}</p>
                                </div>
                                <div className="text-[10px] leading-3">
                                    <p className="text-[#aeaeae]">Zone</p>
                                    <p className="font-medium text-[#212121]">{data?.ticket?.zoneId}</p>
                                </div>
                                <div className="text-[10px] leading-3">
                                    <p className="text-[#aeaeae]">Ticket</p>
                                    <p className="font-medium text-[#212121]">{data?.ticket?.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="z-[-1] flex w-fit flex-col items-center justify-between p-2 animate-[colorAnim_10s_infinite]">
                        <div className="text-white">
                        </div>
                        <div className="text-white">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TicketAnimation
