'use client'

import { Environment } from "@/constants/enums"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setWebSocketInstance } from "./manager"

export const WebsocketConnection = () => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string
    const dispatch = useDispatch()
    useEffect(() => {
        const ws = new WebSocket(wsUrl)

        ws.onopen = () => {
            setWebSocketInstance(ws)
            if (process.env.NODE_ENV === Environment.DEVELOPMENT) console.log('connected')
        }

        ws.onerror = (error) => {
            if (process.env.NODE_ENV === Environment.DEVELOPMENT) console.log(error)
        }

        ws.onclose = () => {
            setWebSocketInstance(null)
        }
        return () => ws.close()
    }, [wsUrl, dispatch]);

    return null
}