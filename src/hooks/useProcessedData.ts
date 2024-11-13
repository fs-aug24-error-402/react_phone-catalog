import { getProducts } from '../api.ts';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product.ts';

export function useProcessedData() {
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabletsAmount] = useState(0);
  const [accessoriesAmount, setAccessoriesAmount] = useState(0);

  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPricesModels, setHotPricesModels] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(res => {
      const newDevices = res.filter(device => device.year === 2022);

      setNewModels(newDevices);
    });

    getProducts().then(res => {
      const newPrices = res
        .sort(
          (device1, device2) =>
            device2.fullPrice -
            device2.price -
            (device1.fullPrice - device1.price),
        )
        .slice(0, 20);

      setHotPricesModels(newPrices);
    });
    getProducts()
      .then(res => {
        setPhonesAmount(
          res.filter(device => device.category === 'phones').length,
        );
        setTabletsAmount(
          res.filter(device => device.category === 'tablets').length,
        );
        setAccessoriesAmount(
          res.filter(device => device.category === 'accessories').length,
        );
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return {
    phonesAmount,
    tabletsAmount,
    accessoriesAmount,
    newModels,
    hotPricesModels,
  };
}
