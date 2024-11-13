import { FC } from 'react';
import { Button } from '../Button';
import { Product } from '../../types';
import { useUpdateReduxValuesFromLocalStorage } from '../../hooks/useUpdateReduxValuesFromLocalStorage';
import { useAppSelector } from '../../hooks/useAppSelector';

interface Props {
  product: Product;
  className: string;
}

export const AddToCartButton: FC<Props> = ({ product, className }) => {
  const { toggleProduct } = useUpdateReduxValuesFromLocalStorage();
  const cartProducts = useAppSelector(state => state.addedProducts)
    .addedProducts.cart;
  const isSelected = cartProducts.find(({ id }) => id === product.id)
    ? true
    : false;

  return (
    <Button
      onClick={() => toggleProduct('cart', product)}
      className={className}
      selected={isSelected}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
