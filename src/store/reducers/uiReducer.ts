import { IUI } from '@/types/uiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUI = {
  sidebar: false,
  menu: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebar = action.payload;
    },
    toggleMenu(state, action: PayloadAction<string>) {
      state.menu = state.menu === action.payload ? null : action.payload;
    },
  },
});

export default uiSlice.reducer;
