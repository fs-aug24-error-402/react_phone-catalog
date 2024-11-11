import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (_, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
