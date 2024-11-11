import React from 'react';
import { Button } from '../Button';

interface Props {
  totalItem: number;
  totalPrice: number;
}

export const Checkout: React.FC<Props> = ({ totalItem, totalPrice }) => {
  return (
    <article
      className="flex flex-col p-24 w- h-max border border-solid
    border-elements rounded-sm desktop:col-span-1"
    >
      <div className="flex flex-col text-center">
        <span className="text-h3-lg">${totalPrice}</span>
        <span className="font-medium text-secondary">
          Total for {totalItem} items
        </span>
        <div className="w-full my-16 border-t border-solid border-elements" />
      </div>
      <Button children="Checkout" />
    </article>
  );
};
