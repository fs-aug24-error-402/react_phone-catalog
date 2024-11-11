import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { KeyType } from '../types/KeyType';

interface TotalCount {
  price: number;
  item: number;
}

interface ProductsState {
  addedProducts: { [key in KeyType]: Product[] };
  totalCount: TotalCount;
}

const initialState: ProductsState = {
  addedProducts: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  },
  totalCount: { price: 0, item: 0 },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleProduct: (
      state,
      action: PayloadAction<{ key: KeyType; product: Product }>,
    ) => {
      const { key, product } = action.payload;
      const products = state.addedProducts[key];
      const index = products.findIndex(p => p.id === product.id);

      if (index !== -1) {
        // eslint-disable-next-line no-param-reassign
        state.addedProducts[key] = products.filter(p => p.id !== product.id);
      } else {
        state.addedProducts[key].push(product);
      }
    },

    removeProduct: (
      state,
      action: PayloadAction<{ key: KeyType; productId: number }>,
    ) => {
      const { key, productId } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.addedProducts[key] = state.addedProducts[key].filter(
        p => p.id !== productId,
      );
    },

    updateProductCount: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.addedProducts.cart = state.addedProducts.cart.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
      productsSlice.caseReducers.calculateTotalInCart(state);
    },

    calculateTotalInCart: state => {
      const products = state.addedProducts.cart;
      const countTotal = products.reduce(
        (total, product) => {
          const count = product.count || 1;

          return {
            price: total.price + product.price * count,
            item: total.item + count,
          };
        },
        { price: 0, item: 0 },
      );

      // eslint-disable-next-line no-param-reassign
      state.totalCount = countTotal;
    },
  },
});

export const {
  toggleProduct,
  removeProduct,
  updateProductCount,
  calculateTotalInCart,
} = productsSlice.actions;
export default productsSlice.reducer;
