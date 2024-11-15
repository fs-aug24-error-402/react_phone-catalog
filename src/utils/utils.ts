import { Product } from '../types';

export function getFilteredDevices(
  devices: Product[],
  query: string,
  sortBy: string,
) {
  const filtered = devices.filter(device =>
    device.name.toLowerCase().includes(query),
  );

  return filtered.sort((d1, d2) => {
    switch (sortBy) {
      case 'newest':
        return d2.year - d1.year;
      case 'oldest':
        return d1.year - d2.year;
      case 'highest price':
        return d2.price - d1.price;
      case 'lowest price':
        return d1.price - d2.price;
      default:
        return 0;
    }
  });
}

export function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
