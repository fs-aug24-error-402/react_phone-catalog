import { FC } from 'react';
import { Product } from '../../types/Product';
import { Card } from '../Card/Card';
// import './catalog.scss';

interface Props {
  gadgets: Product[];
}

export const Catalog: FC<Props> = ({ gadgets }) => {
  return (
    <div className="grid grid-cols-4 gap-1 gap-x-1">
      {gadgets.slice(0, 15).map(gadget => (
        <Card product={gadget} key={gadget.id} />
      ))}
    </div>
  );
};
