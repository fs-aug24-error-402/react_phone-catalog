import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Product, KeyType } from '../types';
import { useAppSelector } from './useAppSelector';
import {
  calculateTotalInCart,
  removeProduct,
  toggleProduct,
  updateProductCount,
} from '../features/addedProducts';

export const useUpdateReduxValuesFromLocalStorage = () => {
  const dispatch = useDispatch();
  const { addedProducts, totalCount } = useAppSelector(
    state => state.addedProducts,
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(addedProducts.cart));
    localStorage.setItem('favorites', JSON.stringify(addedProducts.favorites));
  }, [addedProducts]);

  useEffect(() => {
    dispatch(calculateTotalInCart());
  }, [dispatch, addedProducts.cart]);

  const handleToggleProduct = (key: KeyType, product: Product) =>
    dispatch(toggleProduct({ key, product }));

  const handleRemoveProduct = (key: KeyType, productId: number) =>
    dispatch(removeProduct({ key, productId }));

  const handleUpdateProductCount = (product: Product) =>
    dispatch(updateProductCount(product));

  return {
    addedProducts,
    totalCount,
    toggleProduct: handleToggleProduct,
    removeProduct: handleRemoveProduct,
    updateProductCount: handleUpdateProductCount,
  };
};
