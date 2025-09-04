import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    user: {
        id: string,
        username: string,
        role: string,
    } | undefined
}

const initialState: CounterState = {
    user: undefined
}

export const PersistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})

export const { setUser } = PersistSlice.actions

export default PersistSlice.reducer