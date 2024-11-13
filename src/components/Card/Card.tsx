import { useUpdateReduxValuesFromLocalStorage } from '../../hooks/useUpdateReduxValuesFromLocalStorage';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import './Card.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
  const { toggleProduct } = useUpdateReduxValuesFromLocalStorage();

  return (
    <article
      className="card tablet:h-508 mobile:h-440 mobile:w-[288px]
    tablet-large:w-[240px] desktop:w-[288px]"
    >
      <Link className="img_url" to={`/${product.category}/${product.itemId}`}>
        <img
          src={`${product.image}`}
          alt={product.name}
          className="card__img"
        />
      </Link>

      <h3 className="card__model font-medium" title={product.name.trim()}>
        {product.name}
      </h3>

      <div className="card__price-container">
        <span className="card__price-current font-bold">${product.price}</span>
        <span className="card__price-old font-bold">${product.fullPrice}</span>
      </div>

      <div className="card__info-container">
        <div className="card__info-title-container">
          <span className="card__info-title font-semibold">Screen</span>
          <span className="card__info-title font-semibold">Capacity</span>
          <span className="card__info-title font-semibold">RAM</span>
        </div>

        <div className="card__info-param-container">
          <span className="card__info-param font-semibold">
            {product.screen}
          </span>
          <span className="card__info-param font-semibold">
            {product.capacity.replace(/[G,M]/, ' G')}
          </span>
          <span className="card__info-param font-semibold">
            {product.ram.replace(/[G]/, ` G`)}
          </span>
        </div>
      </div>

      <div className="card__buttons-container">
        <Button
          onClick={() => toggleProduct('cart', product)}
          className="w-[100%] font-bold"
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
