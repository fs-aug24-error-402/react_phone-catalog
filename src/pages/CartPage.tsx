import { useState } from 'react';
import { useUpdateReduxValuesFromLocalStorage } from '../hooks/useUpdateReduxValuesFromLocalStorage';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { CartItem } from '../components/CartItem';
import { Checkout } from '../components/Checkout';
import { CheckoutModal } from '../components/CheckoutModal';
import style from '../styles/helpers/container.module.scss';

export const CartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addedProducts, removeProduct, updateProductCount, totalCount } =
    useUpdateReduxValuesFromLocalStorage();

  const handleShowModal = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    addedProducts.cart.map(product => removeProduct('cart', product.id));
    setShowModal(false);
  };

  return (
    <div className={style.container}>
      {showModal && (
        <CheckoutModal onClose={handleCloseModal} onAccept={handleAccept} />
      )}

      <Breadcrumbs className="my-24" />

      <h1>Cart</h1>
      {addedProducts.cart.length ? (
        <section
          className="flex flex-col gap-y-32 mt-32 mb-56
        tablet:mb-64 desktop:mb-80 desktop:grid desktop:grid-cols-3 gap-x-16"
        >
          <div className="flex flex-col gap-y-16 desktop:col-span-2">
            {addedProducts.cart.map(product => (
              <CartItem
                key={product.id}
                addedProduct={product}
                onRemove={removeProduct}
                onUpdate={updateProductCount}
              />
            ))}
          </div>

          <Checkout
            totalItem={totalCount.item}
            totalPrice={totalCount.price}
            onCheckout={handleShowModal}
            isLoading={isLoading}
          />
        </section>
      ) : (
        <img
          src="img/cart-is-empty.png"
          alt="Cart is empty"
          className="mx-auto h-[40vh]"
        />
      )}
    </div>
  );
};
