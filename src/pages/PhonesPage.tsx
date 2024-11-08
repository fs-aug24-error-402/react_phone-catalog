import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog/Catalog';
import { getProducts } from '../api';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(res =>
      setPhones(res.filter(device => device.category === 'phones')),
    );
  }, []);

  return <Catalog gadgets={phones} />;
};
