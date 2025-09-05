import { createSlice } from '@reduxjs/toolkit'

interface WebSocketConnection {
    connected: boolean;
    ws: WebSocket | null;
}

export interface PersistSlice {
    websocket: WebSocketConnection;
    token: string
}

const initialState: PersistSlice = {
    websocket: {
        connected: false,
        ws: null
    },
    token: ''
}

export const PersistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setWebsocket: (state, action) => {
            state.websocket = { ...state.websocket, ...action.payload }
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
})

export const { setWebsocket, setToken } = PersistSlice.actions

export default PersistSlice.reducer