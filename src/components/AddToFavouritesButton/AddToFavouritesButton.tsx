import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import cn from 'classnames';

import { Product } from '../../types';
import { useUpdateReduxValuesFromLocalStorage } from '../../hooks/useUpdateReduxValuesFromLocalStorage';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useTheme } from '../../app/hooks';

interface Props {
  product: Product;
  className: string;
}

export const AddToFavouritesButton: FC<Props> = ({ product, className }) => {
  const { toggleProduct } = useUpdateReduxValuesFromLocalStorage();
  const { isDark } = useTheme();

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
        'bg-surface2 rounded-lg aspect-square flex items-center justify-center transition-all duration-300 ease-in-out',
        {
          'border border-icons hover:border-primary': !isDark,
          'hover:bg-icons hover:border-none': isDark,
          'border border-elements bg-transparent': isDark && isSelected,
        },
      )}
    >
      <AnimatePresence mode="wait">
        {isSelected ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <FiHeart
              fill="var(--color-secondary-accent)"
              stroke="var(--color-secondary-accent)"
            />
          </motion.div>
        ) : (
          <motion.div
            key="unselected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <FiHeart className="h-16 w-16" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
