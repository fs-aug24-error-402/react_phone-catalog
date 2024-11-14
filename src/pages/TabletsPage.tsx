import { useEffect, useMemo, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || 'newest';

  const filteredItems = useMemo(
    () => getFilteredDevices(tablets, query, sortBy),
    [query, sortBy, tablets],
  );

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(res =>
        setTablets(res.filter(device => device.category === 'tablets')),
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={style.container}>
      <Breadcrumbs className="tablet:mb-40 mobile:mb-24" />

      <h1 className="mb-8">Tablets</h1>

      <span className="text-secondary">{filteredItems.length} models</span>

      <Filters />

      <Catalog items={filteredItems} isLoading={isLoading} />
      <PaginatedItems items={filteredItems} />
    </div>
  );
};
