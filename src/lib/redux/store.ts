"use client"
import { configureStore } from '@reduxjs/toolkit'
import ntSlice from './networkTablesSlice'
import tabsSlice from './tabsSlice'
import uiStateSlice from './uiStateSlice'

const store = configureStore({
    reducer: {
      'ui': uiStateSlice,
      'nt': ntSlice,
      'tabs': tabsSlice,
    }
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store