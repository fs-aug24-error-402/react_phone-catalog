import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'isDark',
  initialState: false,
  reducers: {
    toggleTheme: value => !value,
    setTheme: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const themeActions = themeSlice.actions;
