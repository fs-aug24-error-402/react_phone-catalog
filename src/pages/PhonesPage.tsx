import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from '../styles/helpers/container.module.scss';

import { Product } from '../types';
import { Catalog } from '../components/Catalog';
import { getProducts } from '../api.ts';
import { getFilteredDevices } from '../utils/utils';
import { Pagination } from '../components/Pagination';
import { Filters } from '../components/Filters';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.tsx';

export const PhonesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || 'newest';

  const filteredItems = useMemo(
    () => getFilteredDevices(phones, query, sortBy),
    [query, sortBy, phones],
  );

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(res =>
        setPhones(res.filter(device => device.category === 'phones')),
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={style.container}>
      <Breadcrumbs className="tablet:mb-40 mobile:mb-24" />

      <h1 className="mb-8">Mobile phones</h1>

      <span className="text-secondary">{filteredItems.length} models</span>

      <Filters />

      <Catalog items={filteredItems} isLoading={isLoading} />
      <Pagination items={filteredItems} />
    </div>
  );
};
