import { Product } from '../../src/types/Product';
import Products from './products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getDevices(): Promise<Product[]> {
  return wait(500).then(() => Products);
}
