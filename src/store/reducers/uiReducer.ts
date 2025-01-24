import { IUI } from '@/types/uiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUI = {
  sidebar: false,
  isTaskEditing: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebar = action.payload;
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isTaskEditing = action.payload;
    },
  },
});

export default uiSlice.reducer;
