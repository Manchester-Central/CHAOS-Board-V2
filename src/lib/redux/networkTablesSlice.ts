"use client";

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NetworkTablesTypes } from 'ntcore-ts-client'

interface NTState {
    isConnected: boolean,
    data: Record<string, NetworkTablesTypes | null>,
}

const initialState = { data: {}, isConnected: false } satisfies NTState as NTState;

const ntSlice = createSlice({
    name: 'ntSlice',
    initialState,
    reducers: {
        updateConnected(state, action: PayloadAction<{ isConnected: boolean }>) {
            state.isConnected = action.payload.isConnected;
        },
        updateNTValue(state, action: PayloadAction<{ topicName: string, value: NetworkTablesTypes | null }>) {
            state.data[action.payload.topicName] = action.payload.value;
        },
    },
});

export const { updateConnected, updateNTValue } = ntSlice.actions;
export default ntSlice.reducer;