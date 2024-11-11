import { useUpdateReduxValuesFromLocalStorage } from '../../hooks/useUpdateReduxValuesFromLocalStorage';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import './Card.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
  const { toggleProduct } = useUpdateReduxValuesFromLocalStorage();

  return (
    <article className="card tablet:h-508 mobile:h-440">
      <a className="img_url" href="#">
        <img
          src={`${product.image}`}
          alt={product.name}
          className="card__img"
        />
      </a>

      <h3 className="card__model font-main-font" title={product.name.trim()}>
        {product.name}
      </h3>

      <div className="card__price-container">
        <span className="card__price-current">${product.price}</span>
        <span className="card__price-old">${product.fullPrice}</span>
      </div>

      <div className="card__info-container">
        <div className="card__info-title-container">
          <span className="card__info-title">Screen</span>
          <span className="card__info-title">Capacity</span>
          <span className="card__info-title">RAM</span>
        </div>

        <div className="card__info-param-container">
          <span className="card__info-param">{product.screen}</span>
          <span className="card__info-param">
            {product.capacity.replace(/[G,M]/, ' G')}
          </span>
          <span className="card__info-param">
            {product.ram.replace(/[G]/, ` G`)}
          </span>
        </div>
      </div>

      <div className="card__buttons-container">
        <Button
          onClick={() => toggleProduct('cart', product)}
          className="w-[100%]"
        >
          Add to cart
        </Button>

        <button
          onClick={() => toggleProduct('favorites', product)}
          className="card__buttons-favorite"
        >
          <img
            src="img/icons/svg/icon-favourites.svg"
            className="card__buttons-heart-img"
            alt="Add to favorite"
          />
        </button>
      </div>
    </article>
  );
};
