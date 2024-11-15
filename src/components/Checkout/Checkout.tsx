import React from 'react';
import { Button } from '../Button';
import { Loader } from '../Loader';

interface Props {
  totalItem: number;
  totalPrice: number;
  isLoading: boolean;
  onCheckout: () => void;
}

export const Checkout: React.FC<Props> = ({
  totalItem,
  totalPrice,
  isLoading,
  onCheckout,
}) => {
  return (
    <article
      className="flex flex-col p-24 h-max border border-solid
    border-elements rounded-sm desktop:col-span-1"
    >
      <div className="flex flex-col text-center">
        <span className="text-h3-lg">${totalPrice}</span>

        <span className="font-medium text-secondary">
          Total for {totalItem} items
        </span>

        <div className="w-full my-16 border-t border-solid border-elements desktop:my-24" />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Button children="Checkout" onClick={onCheckout} />
      )}
    </article>
  );
};
