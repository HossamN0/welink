import { createSlice } from '@reduxjs/toolkit'

interface WebSocketConnection {
    connected: boolean;
    ws: WebSocket | null;
}

export interface PersistSlice {
    websocket: WebSocketConnection;
}

const initialState: PersistSlice = {
    websocket: {
        connected: false,
        ws: null
    }
}

export const PersistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setWebsocket: (state, action) => {
            state.websocket = { ...state.websocket, ...action.payload }
        }
    },
})

export const { setWebsocket } = PersistSlice.actions

export default PersistSlice.reducer