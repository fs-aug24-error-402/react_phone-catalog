import { Product, MobileDevice } from './types';

const BASE_URL =
  'https://fs-aug24-error-402.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(300)
    .then(() => fetch(BASE_URL + 'products.json'))
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
}

export function getPhones(): Promise<MobileDevice[]> {
  return wait(300)
    .then(() => fetch(BASE_URL + 'phones.json'))
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
}

export function getPhoneById(phoneId: string): Promise<MobileDevice> {
  return getPhones().then(
    phones =>
      phones.find(({ id }) => id === phoneId) ||
      Promise.reject(new Error('Phone not found')),
  );
}
