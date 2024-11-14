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
      <>
        {isLoading ? (
          <Skeleton
            containerClassName="mb-24 mobile:h-[140px] tablet:h-[190px]"
            count={1}
            borderRadius={20}
            width={200}
            height="100%"
          />
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
          </>
        )}

        {isLoading ? (
          <Skeleton
            borderRadius={15}
            className="mb-8"
            count={2}
            height="100%"
            containerClassName="mb-40 h-24"
          />
        ) : (
          <div className="card__price-container">
            <span className="card__price-current font-bold">
              ${product.price}
            </span>
            <span className="card__price-old font-bold">
              ${product.fullPrice}
            </span>
          </div>
        )}

        <div className="card__info-container">
          {isLoading ? (
            <div className="flex flex-col mt-">
              <Skeleton
                containerClassName="h-12 mb-40"
                className="mb-12"
                borderRadius={15}
                count={3}
                width={200}
                height="100%"
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-between mt-32">
            <Skeleton borderRadius={20} count={1} width={150} height={40} />
            <Skeleton count={1} circle width={40} height={40} />
          </div>
        ) : (
          <div className="card__buttons-container">
            <AddToCartButton product={product} className="w-full" />

            <AddToFavouritesButton product={product} className="h-40" />
          </div>
        )}
      </>
    </article>
  );
};
