import { getDevices } from '../../public/api/api';
import { useState } from 'react';
import { Product } from '../types/Product';

export function useProcessedData() {
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabletsAmount] = useState(0);
  const [accessoriesAmount, setAccessoriesAmount] = useState(0);

  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPricesModels, setHotPricesModels] = useState<Product[]>([]);

  // const isEmptyError = !dataFromServer.length && !isUploadError && !isLoading;

  getDevices().then(res => {
    const newDevices = res.filter(device => device.year === 2022);

    setNewModels(newDevices);
  });

  getDevices().then(res => {
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

  getDevices().then(res => {
    setPhonesAmount(res.filter(device => device.category === 'phones').length);
    setTabletsAmount(
      res.filter(device => device.category === 'tablets').length,
    );
    setAccessoriesAmount(
      res.filter(device => device.category === 'accessories').length,
    );
  });

  return {
    phonesAmount,
    tabletsAmount,
    accessoriesAmount,
    newModels,
    hotPricesModels,
  };
}
