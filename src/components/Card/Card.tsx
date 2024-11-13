import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavouritesButton } from '../AddToFavouritesButton';

import './Card.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
  return (
    <article className="card tablet:h-508 mobile:h-440">
      <a className="img_url">
        <img
          src={`${product.image}`}
          alt={product.name}
          className="card__img"
        />
      </a>

      <h3 className="card__model font-main-font" title={product.name}>
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
          <span className="card__info-param">{product.capacity}</span>
          <span className="card__info-param">{product.ram}</span>
        </div>
      </div>

      <div className="card__buttons-container">
        <AddToCartButton product={product} className="w-full" />

        <AddToFavouritesButton product={product} className="h-40" />
      </div>
    </article>
  );
};
