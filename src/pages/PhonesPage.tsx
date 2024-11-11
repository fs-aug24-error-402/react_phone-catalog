import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../types/Product';
import { getDevices } from '../../public/api/api';
import { Catalog } from '../components/Catalog/Catalog';
import { getFilteredDevices } from '../utils/utils';
import { PaginatedItems } from '../components/Pagination/Pagiation';
import { Filters } from '../components/Filters/Filters';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(phones, query, sortBy);

  useEffect(() => {
    getDevices().then(res =>
      setPhones(res.filter(device => device.category === 'phones')),
    );
  }, []);

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
