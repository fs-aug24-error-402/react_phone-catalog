const key = 'da52aed7dfb99172484ba41db4123521';
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const getCities = async (value: string) => {
  const url = BASE_URL;
  const requestBody = {
    apiKey: key,
    modelName: 'Address',
    calledMethod: 'getCities',
    methodProperties: {
      FindByString: value,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  return data;
};

export const getWarehouses = async (cityRef: string) => {
  const url = BASE_URL;
  const requestBody = {
    apiKey: key,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityRef: cityRef,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  return data;
};
