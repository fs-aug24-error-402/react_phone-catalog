import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

import { handleScrollToTop } from '../../utils/utils';

const PRODUCT_TEMPLATE = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

interface Props {
  items: Product[];
  isLoading?: boolean;
}

export const Catalog: FC<Props> = ({ items, isLoading = false }) => {
  const [searchParams] = useSearchParams();

  const itemsOnPage = Number(searchParams.get('items-on-page')) || 12;
  const currentPageNumber = Number(searchParams.get('page-number')) || 1;
  const skeletons = Array(itemsOnPage).fill(PRODUCT_TEMPLATE);

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
      {itemsForDisplay.length
        ? itemsForDisplay.map(item => (
            <Card product={item} isLoading={isLoading} key={item.id} />
          ))
        : skeletons.map(item => <Card product={item} isLoading={true} />)}
    </section>
  );
};
