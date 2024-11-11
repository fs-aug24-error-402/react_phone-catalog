import React from 'react';
import { Product } from '../../types/Product';
import cn from 'classnames';
import { KeyType } from '../../types/KeyType';

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
      className="flex flex-col gap-y-16 p-16 border border-solid border-elements rounded-sm
    tablet:flex-row tablet:justify-between tablet:gap-24 tablet:p-24"
    >
      <section className="flex gap-16 items-center">
        <div>
          <button
            onClick={() => onRemove('cart', addedProduct.id)}
            className="h-16 w-16 bg-close bg-center hover:bg-close-active"
          />
        </div>

        <div className="w-66">
          <img
            src={addedProduct.image}
            alt="Phone"
            className="h-66 object-cover"
          />
        </div>

        <div className="text-buttons font-semibold">{addedProduct.name}</div>
      </section>

      <section className="flex justify-between items-center tablet:gap-24">
        <div className="flex items-center">
          <button
            onClick={handleDecreaseCount}
            className={cn(
              'h-32 w-32 bg-minus bg-no-repeat bg-center border border-elements rounded-full',
              {
                'bg-minus-active': itemCount > 1,
                'hover:border-primary': itemCount > 1,
              },
            )}
          />
          <span className="h-32 w-32 text-center leading-8">{itemCount}</span>
          <button
            onClick={handleIncreaseCount}
            className="h-32 w-32 bg-plus bg-no-repeat bg-center border border-elements rounded-full hover:border-primary"
          />
        </div>

        <div className="text-h3-lg tablet:flex tablet:w-80 tablet:justify-end">
          ${itemPrice * itemCount}
        </div>
      </section>
    </article>
  );
};
