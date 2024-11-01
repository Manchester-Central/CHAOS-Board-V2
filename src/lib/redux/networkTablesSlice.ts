"use client";

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NetworkTablesTypeInfo, NetworkTablesTypes } from 'ntcore-ts-client'
import { NtEntry } from '../data/ntEntry';

interface NTState {
    isConnected: boolean,
    data: Record<string, NtEntry>,
}

const initialState = { data: {}, isConnected: false } satisfies NTState as NTState;

const ntSlice = createSlice({
    name: 'ntSlice',
    initialState,
    reducers: {
        updateConnected(state, action: PayloadAction<{ isConnected: boolean }>) {
            state.isConnected = action.payload.isConnected;
        },
        addNTEntry(state, action: PayloadAction<{ topicName: string, type: NetworkTablesTypeInfo[1] }>) {
            const {topicName, type} = action.payload;
            state.data[action.payload.topicName] = {key: topicName, type: type};
        },
        updateNTValue(state, action: PayloadAction<{ topicName: string, value: NetworkTablesTypes | null }>) {
            const {topicName, value} = action.payload;
            const entry = state.data[action.payload.topicName];
            if (!entry) {
                console.warn(`Topic is not known: ${topicName}`);
                return;
            }
            entry.value = value;
        },
    },
});

export const { updateConnected, addNTEntry, updateNTValue } = ntSlice.actions;
export default ntSlice.reducer;