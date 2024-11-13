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
  const [isLoading, setIsLoading] = useState(false);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(tablets, query, sortBy);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(res =>
        setTablets(res.filter(device => device.category === 'phones')),
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
