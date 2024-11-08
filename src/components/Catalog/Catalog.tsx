import { FC } from 'react';
import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

interface Props {
  gadgets: Product[];
}

export const Catalog: FC<Props> = ({ gadgets }) => {
  return (
    <div
      className="grid desktop:grid-cols-4 justify-self-center content-center gap-x-16 gap-y-40 my-16
        tablet-large:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1"
    >
      {gadgets.map(gadget => (
        <Card product={gadget} key={gadget.id} />
      ))}
    </div>
  );
};
