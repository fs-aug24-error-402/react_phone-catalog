import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getDevices } from '../../public/api/api';
import { Catalog } from '../components/Catalog/Catalog';
import { Product } from '../types/Product';
import { getFilteredDevices } from '../utils/utils';
import { Filters } from '../components/Filters/Filters';
import { PaginatedItems } from '../components/Pagination/Pagiation';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(tablets, query, sortBy);

  useEffect(() => {
    getDevices().then(res =>
      setTablets(res.filter(device => device.category === 'tablets')),
    );
  }, []);

  return (
    !!filteredItems.length && (
      <>
        <h1>Tablets</h1>
        <span>{filteredItems.length} models</span>

        <Filters />

        {!!filteredItems.length && (
          <>
            <Catalog items={filteredItems} />
            <PaginatedItems items={filteredItems} />
          </>
        )}
      </>
    )
  );
};
