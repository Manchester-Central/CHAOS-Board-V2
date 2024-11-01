"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TabsState, defaultInitialTabData } from "../data/tabState";
import { Tab } from "../data/tab";

const initialState = {
    allTabs: {},
    currentTab: '',
} satisfies TabsState as TabsState;

const tabsSlice = createSlice({
  name: "tabsSlice",
  initialState,
  reducers: {
    loadInitialTabs(state, action: PayloadAction<TabsState>) {
      const tabs = action.payload;
      state.allTabs = tabs.allTabs;
      state.currentTab = tabs.currentTab;
    },
    updateCurrentTab(state, action: PayloadAction<{ tabName: string }>) {
      state.currentTab = action.payload.tabName;
    },
    updateTab(state, action: PayloadAction<Tab>) {
      const updatedTab = action.payload;
      state.allTabs[updatedTab.name] = updatedTab;
    },
    addTab(state, action: PayloadAction<{ tabName: string }>) {
      const tabName = action.payload.tabName;
      state.allTabs[tabName] = {
        layout: [],
        name: tabName,
        widgets: [],
      };
    },
    updateTabName(state, action: PayloadAction<{ oldTabName: string, newTabName: string }>) {
      const {oldTabName, newTabName} = action.payload;
      const currentTab = state.allTabs[oldTabName];
      currentTab.name = newTabName;
      state.allTabs[newTabName] = currentTab;
      delete state.allTabs[oldTabName];
      state.currentTab = newTabName;
    },
    deleteTab(state, action: PayloadAction<{ tabName: string }>) {
      const tabName = action.payload.tabName;
      delete state.allTabs[tabName];
      if (Object.keys(state.allTabs).length === 0) {
        state.allTabs = defaultInitialTabData.allTabs;
      }
      state.currentTab = Object.keys(state.allTabs)[0];
    },
  },
});

export const { loadInitialTabs, updateCurrentTab, updateTab, addTab, updateTabName, deleteTab } = tabsSlice.actions;
export default tabsSlice.reducer;
