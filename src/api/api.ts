import { Product, MobileDevice } from '../types';

const BASE_URL =
  'https://fs-aug24-error-402.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(BASE_URL + 'products.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export function getPhones(): Promise<MobileDevice[]> {
  return wait(500)
    .then(() => fetch(BASE_URL + 'phones.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export function getProductById(productId: number): Promise<Product> {
  return getProducts().then(products => {
    const product = products.find(({ id }) => id === productId);

    return product ? product : Promise.reject(new Error('Product not found'));
  });
}

export function getPhoneById(phoneId: string): Promise<MobileDevice> {
  return getPhones().then(phones => {
    const phone = phones.find(({ id }) => id === phoneId);

    return phone ? phone : Promise.reject(new Error('Phone not found'));
  });
}
