import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const windowWidthSlice = createSlice({
  name: 'windowWidth',
  initialState: window.innerWidth,
  reducers: {
    setWindowWidth: (_, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const windowWidthActions = windowWidthSlice.actions;
