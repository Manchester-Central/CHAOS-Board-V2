import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NetworkTablesTypes } from 'ntcore-ts-client'

interface NTState {
    data: Record<string, NetworkTablesTypes | null>
}

const initialState = { data: {} } satisfies NTState as NTState

const ntSlice = createSlice({
    name: 'ntSlice',
    initialState,
    reducers: {
        updateNTValue(state, action: PayloadAction<{ topicName: string, value: NetworkTablesTypes | null }>) {
            state.data[action.payload.topicName] = action.payload.value
        },
    },
})

export const { updateNTValue } = ntSlice.actions
export default ntSlice.reducer