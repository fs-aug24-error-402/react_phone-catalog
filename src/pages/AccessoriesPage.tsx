import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from '../styles/helpers/container.module.scss';

import { Product } from '../types';
import { getProducts } from '../api.ts';
import { Catalog } from '../components/Catalog';
import { getFilteredDevices } from '../utils/utils';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.tsx';

export const AccessoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || 'newest';

  const filteredItems = useMemo(
    () => getFilteredDevices(accessories, query, sortBy),
    [query, sortBy, accessories],
  );

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(res =>
        setAccessories(res.filter(device => device.category === 'accessories')),
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={style.container}>
      <Breadcrumbs className="tablet:mb-40 mobile:mb-24" />

      <h1 className="mb-8">Accessories</h1>

      <span className="text-secondary">{filteredItems.length} models</span>

      <Filters />

      <Catalog items={filteredItems} isLoading={isLoading} />
      <Pagination items={filteredItems} />
    </div>
  );
};
