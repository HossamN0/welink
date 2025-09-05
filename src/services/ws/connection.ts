'use client'

import { Environment } from "@/constants/enums"
import { setWebsocket } from "@/store/reducers/persist-slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const WebsocketConnection = () => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string
    const dispatch = useDispatch()
    useEffect(() => {
        const ws = new WebSocket(wsUrl)

        ws.onopen = () => {
            dispatch(setWebsocket({ connected: true, ws }));
            console.log('connected')
        }

        // ws.onopen = () => {
        //     console.log("WS connected, subscribing to gate:", 'gate_1');
        //     ws.send(JSON.stringify({ type: "subscribe", payload: { gateId: "gate_1" } }));
        // };

        ws.onmessage = (message) => {
            console.log('message', message)
        }

        ws.onerror = (error) => {
            if (process.env.NODE_ENV === Environment.DEVELOPMENT) console.log(error)
        }

        ws.onclose = () => {
            dispatch(setWebsocket({ connected: false }))
        }
        return () => ws.close()
    }, [wsUrl, dispatch]);

    return null
}