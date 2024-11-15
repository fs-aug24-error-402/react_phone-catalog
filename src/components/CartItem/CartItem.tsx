import { Link } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';

import { Product, KeyType } from '../../types';

interface Props {
  addedProduct: Product & { count: number };
  onRemove: (key: KeyType, productId: number) => void;
  onUpdate: (updatedProduct: Product & { count: number }) => void;
}

export const CartItem: React.FC<Props> = ({
  addedProduct,
  onRemove,
  onUpdate,
}) => {
  const handleIncreaseCount = () => {
    onUpdate({ ...addedProduct, count: (addedProduct.count || 1) + 1 });
  };

  const handleDecreaseCount = () => {
    if (addedProduct.count > 1) {
      onUpdate({ ...addedProduct, count: addedProduct.count - 1 });
    }
  };

  const itemCount = addedProduct.count || 1;
  const itemPrice = addedProduct.price || 0;

  return (
    <article
      className="flex flex-col gap-y-16 p-16 border border-solid
      border-elements rounded-sm tablet:flex-row
      tablet:justify-between tablet:gap-24 tablet:p-24"
    >
      <section className="flex gap-16 items-center">
        <div>
          <button
            onClick={() => onRemove('cart', addedProduct.id)}
            className="text-secondary hover:text-primary transition-colors duration-300 ease-in-out"
          >
            <FiX className="h-16 w-16" />
          </button>
        </div>

        <Link
          to={`/${addedProduct.category}/${addedProduct.itemId}`}
          className="flex justify-center items-center gap-16 tablet:gap-24"
        >
          <div className="w-80 aspect-square flex justify-center items-center">
            <img src={addedProduct.image} alt="Phone" className="h-66" />
          </div>

          <div className="text-buttons font-semibold">{addedProduct.name}</div>
        </Link>
      </section>

      <section className="flex justify-between items-center tablet:gap-24">
        <div className="flex items-center">
          <button
            onClick={handleDecreaseCount}
            className={cn(
              'flex justify-center items-center h-32 w-32',
              'border border-elements rounded-full',
              'transition-colors duration-300 ease-in-out',
              {
                'pointer-events-none text-secondary': itemCount < 2,
                'hover:border-primary text-primary': itemCount > 1,
              },
            )}
          >
            <FiMinus className="h-16 w-16" />
          </button>

          <span className="flex justify-center items-center h-32 w-32 text-center leading-8">
            {itemCount}
          </span>

          <button
            onClick={handleIncreaseCount}
            className={cn(
              'flex justify-center items-center h-32 w-32',
              'border border-elements rounded-lg hover:border-primary',
              'transition-colors duration-300 ease-in-out',
            )}
          >
            <FiPlus className="h-16 w-16" />
          </button>
        </div>

        <div className="text-h3-lg tablet:flex tablet:w-80 tablet:justify-end">
          ${itemPrice * itemCount}
        </div>
      </section>
    </article>
  );
};
