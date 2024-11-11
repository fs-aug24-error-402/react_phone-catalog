import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

import { handleScrollToTop } from '../../utils/utils';

interface Props {
  items: Product[];
}

export const Catalog: FC<Props> = ({ items }) => {
  const [searchParams] = useSearchParams();

  const itemsOnPage = Number(searchParams.get('items-on-page')) || 12;
  const currentPageNumber = Number(searchParams.get('page-number')) || 1;

  const firstPageItemIndex = (currentPageNumber - 1) * itemsOnPage;
  const lastPageItemIndex = firstPageItemIndex + itemsOnPage;

  const itemsForDisplay = items.slice(firstPageItemIndex, lastPageItemIndex);

  useEffect(() => {
    handleScrollToTop();
  }, [currentPageNumber]);

  return (
    <section
      className="grid desktop:grid-cols-4 justify-self-center content-center
          gap-x-16 gap-y-40 mb-40 tablet-large:grid-cols-3 tablet:grid-cols-2
          mobile:grid-cols-1"
    >
      {itemsForDisplay.map(item => (
        <Card product={item} key={item.id} />
      ))}
    </section>
  );
};
