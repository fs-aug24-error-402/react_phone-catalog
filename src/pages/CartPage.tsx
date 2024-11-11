import { CartItem } from '../components/CartItem/CartItem';
import { Checkout } from '../components/Checkout/Checkout';
import { useUpdateReduxValuesFromLocalStorage } from '../hooks/useUpdateReduxValuesFromLocalStorage';

export const CartPage = () => {
  const { addedProducts, removeProduct, updateProductCount, totalCount } =
    useUpdateReduxValuesFromLocalStorage();

  return (
    <div className="px-16 tablet:px-24 desktop:px-32">
      <div className="my-24">Breadcrumbs</div>

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
          <Checkout totalItem={totalCount.item} totalPrice={totalCount.price} />
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
