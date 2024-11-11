import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog/Catalog';
import { getProducts } from '../api.ts';
import { getFilteredDevices } from '../utils/utils';
import { PaginatedItems } from '../components/Pagination/Pagiation';
import { Filters } from '../components/Filters/Filters';
import { useProducts } from '../app/hooks';

export const PhonesPage = () => {
  const { products } = useProducts();
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(phones, query, sortBy);

  useEffect(() => {
    getProducts().then(res =>
      setPhones(res.filter(device => device.category === 'phones')),
    );
  }, [products]);

  return (
    <>
      <h1>Mobile phones</h1>
      <span>{filteredItems.length} models</span>

      <Filters />

      {!!phones.length && (
        <>
          <Catalog items={filteredItems} />
          <PaginatedItems items={filteredItems} />
        </>
      )}
    </>
  );
};
