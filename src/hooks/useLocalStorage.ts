import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { KeyType } from '../types/KeyType';

export const useLocalStorage = () => {
  const [totalCount, setTotalCount] = useState({ price: 0, item: 0 });
  const [addedProducts, setAddedProducts] = useState<{
    [key in KeyType]: Product[];
  }>({
    cart: [],
    favorites: [],
  });

  const saveProducts = (key: KeyType, products: Product[]) => {
    localStorage.setItem(`${key}Products`, JSON.stringify(products));
    setAddedProducts(prevState => ({ ...prevState, [key]: products }));
  };

  const updateProducts = useCallback((key: KeyType) => {
    const products = JSON.parse(localStorage.getItem(`${key}Products`) || '[]');

    setAddedProducts(prevState => ({ ...prevState, [key]: products }));
  }, []);

  const toggleProduct = (key: KeyType, product: Product) => {
    let products = JSON.parse(localStorage.getItem(`${key}Products`) || '[]');

    const existingIndex = products.findIndex(
      (p: Product) => p.id === product.id,
    );

    if (existingIndex !== -1) {
      products = products.filter((p: Product) => p.id !== product.id);
    } else {
      products.push(product);
    }

    saveProducts(key, products);
  };

  const remove = useCallback(
    (key: KeyType, productId: number) => {
      const updatedProducts = addedProducts[key].filter(
        product => product.id !== productId,
      );

      saveProducts(key, updatedProducts);
    },
    [addedProducts],
  );

  const updateProductCount = useCallback(
    (updatedProduct: Product & { count: number }) => {
      const updatedCart = addedProducts.cart.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      saveProducts('cart', updatedCart);
      calculateTotalInCart(updatedCart);
    },
    [addedProducts.cart],
  );

  const calculateTotalInCart = (products: (Product & { count: number })[]) => {
    const countTotal = products.reduce(
      (total, product) => {
        const count = product.count || 1;

        return {
          price: total.price + product.price * count,
          item: total.item + count,
        };
      },
      { price: 0, item: 0 },
    );

    setTotalCount(countTotal);
  };

  useEffect(() => {
    updateProducts('cart');
    updateProducts('favorites');
    calculateTotalInCart(addedProducts.cart);
  }, [addedProducts.cart, updateProducts]);

  useEffect(() => {
    const handleStorageChange = () => {
      updateProducts('cart');
      updateProducts('favorites');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateProducts]);

  return {
    addedProducts,
    totalCount,
    toggleProduct,
    remove,
    updateProductCount,
  };
};
