import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  productsSlice,
  windowWidthSlice,
  addedProductsSlice,
  themeSlice,
} from '../features';

const rootReducer = combineSlices(
  productsSlice,
  windowWidthSlice,
  addedProductsSlice,
  themeSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
