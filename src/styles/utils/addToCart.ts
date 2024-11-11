import { Product } from '../../types/Product';

export const addToCart = (addedProduct: Product) => {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');

  const existingProduct = cartProducts.find(
    (product: Product & { count: number }) => product.id === addedProduct.id,
  );

  if (existingProduct) {
    existingProduct.count += 1;
  } else {
    cartProducts.push({ ...addedProduct, count: 1 });
  }

  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};
