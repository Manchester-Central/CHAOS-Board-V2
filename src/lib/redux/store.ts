"use client"
import { configureStore } from '@reduxjs/toolkit'
import ntSlice from './networkTablesSlice'

const store = configureStore({
    reducer: {
      'ntSlice': ntSlice
    }
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store