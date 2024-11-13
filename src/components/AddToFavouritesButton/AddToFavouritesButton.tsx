import { FC } from 'react';
import { Product } from '../../types';
import { useUpdateReduxValuesFromLocalStorage } from '../../hooks/useUpdateReduxValuesFromLocalStorage';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

interface Props {
  product: Product;
  className: string;
}

export const AddToFavouritesButton: FC<Props> = ({ product, className }) => {
  const { toggleProduct } = useUpdateReduxValuesFromLocalStorage();
  const cartProducts = useAppSelector(state => state.addedProducts)
    .addedProducts.favorites;
  const isSelected = cartProducts.find(({ id }) => id === product.id)
    ? true
    : false;

  return (
    <button
      onClick={() => toggleProduct('favorites', product)}
      className={cn(
        className,
        'rounded-lg aspect-square bg-white border border-icons',
        'flex items-center justify-center',
        'hover:border-primary transition-border duration-300 ease-in-out',
      )}
    >
      <AnimatePresence mode="wait">
        {isSelected ? (
          <motion.img
            key="selected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            src="img/icons/svg/icon-favourites-filled.svg"
            alt="Remove from favorites"
          />
        ) : (
          <motion.img
            key="unselected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            src="img/icons/svg/icon-favourites.svg"
            alt="Add to favorites"
          />
        )}
      </AnimatePresence>
    </button>
  );
};
