import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getDevices } from '../../public/api/api';
import { Catalog } from '../components/Catalog/Catalog';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getDevices().then(res =>
      setPhones(res.filter(device => device.category === 'phones')),
    );
  }, []);

  return <Catalog gadgets={phones} />;
};
