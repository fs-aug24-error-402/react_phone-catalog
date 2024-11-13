import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from '../styles/helpers/container.module.scss';

import { getProducts } from '../api.ts';
import { Catalog } from '../components/Catalog/Catalog';
import { Product } from '../types/Product';
import { getFilteredDevices } from '../utils/utils';
import { Filters } from '../components/Filters/Filters';
import { PaginatedItems } from '../components/Pagination/Pagiation';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.tsx';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(tablets, query, sortBy);

  useEffect(() => {
    getProducts().then(res =>
      setTablets(res.filter(device => device.category === 'tablets')),
    );
  }, []);

  return (
    !!filteredItems.length && (
      <div className={style.container}>
        <Breadcrumbs className="tablet:mb-40 mobile:mb-24" />

        <h1 className="mb-8">Tablets</h1>

        <span className="text-secondary">{filteredItems.length} models</span>

        <Filters />

        {!!filteredItems.length && (
          <>
            <Catalog items={filteredItems} />
            <PaginatedItems items={filteredItems} />
          </>
        )}
      </div>
    )
  );
};
