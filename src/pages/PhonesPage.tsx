import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog/Catalog';
import { useProducts } from '../app/hooks';

export const PhonesPage = () => {
  const { products } = useProducts();
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    setPhones(products.filter(device => device.category === 'phones'));
  }, [products]);

  return <Catalog gadgets={phones} />;
};
