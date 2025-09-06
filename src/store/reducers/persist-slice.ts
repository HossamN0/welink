import { createSlice } from '@reduxjs/toolkit'

export interface PersistSlice {
    token: string
}

const initialState: PersistSlice = {
    token: ''
}

export const PersistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
})

export const { setToken } = PersistSlice.actions

export default PersistSlice.reducer