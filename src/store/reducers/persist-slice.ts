import { createSlice } from '@reduxjs/toolkit'

export interface Websocket {
    connected: boolean
}
export interface CounterState {
    websocket: {
        connected: boolean
    }
}

const initialState: CounterState = {
    websocket: {
        connected: false
    }
}

export const PersistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {

        setWebsocket: (state, action) => {
            state.websocket = {...state.websocket, ...action.payload}
        }
    },
})

export const { setWebsocket } = PersistSlice.actions

export default PersistSlice.reducer