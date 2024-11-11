import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '../features/products';
import { windowWidthSlice } from '../features/windowWidth';

const rootReducer = combineSlices(productsSlice, windowWidthSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
