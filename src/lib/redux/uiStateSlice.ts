"use client";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isEditingLayout: boolean;
}

const initialState = {
  isEditingLayout: false,
} satisfies UIState as UIState;

const uiStateSlice = createSlice({
  name: "uiStateSlice",
  initialState,
  reducers: {
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditingLayout = action.payload;
    },
  },
});

export const { setIsEditing } = uiStateSlice.actions;
export default uiStateSlice.reducer;
