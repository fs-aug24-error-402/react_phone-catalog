import { useCallback, useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem/CartItem';
import { Checkout } from '../components/Checkout/Checkout';
import { Product } from '../types/Product';

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<
    (Product & { count: number })[]
  >(() => JSON.parse(localStorage.getItem('cartProducts') || '[]'));

  const updateCartProducts = () => {
    const products = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    setCartProducts(products);
  };

  const removeProductFromCart = useCallback(
    (productId: number) => {
      const updatedCart = cartProducts.filter(
        product => product.id !== productId,
      );

      setCartProducts(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    },
    [cartProducts],
  );

  const updateProductCount = useCallback(
    (updatedProduct: Product & { count: number }) => {
      const updatedCart = cartProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      setCartProducts(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    },
    [cartProducts],
  );

  const countTotal = cartProducts.reduce(
    (total, product) => {
      const count = product.count || 1;

      return {
        price: total.price + product.price * count,
        item: total.item + count,
      };
    },
    { price: 0, item: 0 },
  );

  localStorage.setItem('totalItem', countTotal.item.toString());

  useEffect(() => {
    window.addEventListener('storage', updateCartProducts);

    return () => {
      window.removeEventListener('storage', updateCartProducts);
    };
  }, []);

  return (
    <div className="px-16 tablet:px-24 desktop:px-32">
      <div className="my-24">Breadcrumbs</div>

      <h1>Cart</h1>

      {cartProducts.length ? (
        <section
          className="flex flex-col gap-y-32 mt-32 mb-56
        tablet:mb-64 desktop:mb-80 desktop:grid desktop:grid-cols-3 gap-x-16"
        >
          <div className="flex flex-col gap-y-16 desktop:col-span-2">
            {cartProducts.map(product => (
              <CartItem
                key={product.id}
                addedProduct={product}
                onRemove={removeProductFromCart}
                onUpdate={updateProductCount}
              />
            ))}
          </div>
          <Checkout totalItem={countTotal.item} totalPrice={countTotal.price} />
        </section>
      ) : (
        <img
          src="public/img/cart-is-empty.png"
          alt="Cart is empty"
          className="mx-auto h-screen"
        />
      )}
    </div>
  );
};
