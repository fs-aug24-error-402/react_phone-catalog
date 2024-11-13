import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavouritesButton } from '../AddToFavouritesButton';
import { Link } from 'react-router-dom';
import './Card.scss';
import Skeleton from 'react-loading-skeleton';

interface Props {
  product: Product;
  isLoading?: boolean;
}

export const Card: React.FC<Props> = ({ product, isLoading = false }) => {
  return (
    <article className="card tablet:h-508 mobile:h-440">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Link
            className="img_url"
            to={`/${product.category}/${product.itemId}`}
          >
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
            <span className="card__price-current font-bold">
              ${product.price}
            </span>
            <span className="card__price-old font-bold">
              ${product.fullPrice}
            </span>
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
            <AddToCartButton product={product} className="w-full" />

            <AddToFavouritesButton product={product} className="h-40" />
          </div>
        </>
      )}
    </article>
  );
};
