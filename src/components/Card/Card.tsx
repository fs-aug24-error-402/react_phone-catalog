import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Product } from '../../types';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavouritesButton } from '../AddToFavouritesButton';
import { handleScrollToTop } from '../../utils/utils';

import 'react-loading-skeleton/dist/skeleton.css';
import './Card.scss';
import { addSpaceBetweenNumAndText } from '../../utils';
import { useTheme } from '../../app/hooks';

interface Props {
  product: Product;
  isLoading?: boolean;
}

export const Card: React.FC<Props> = ({ product, isLoading = false }) => {
  const { isDark } = useTheme();

  return (
    <SkeletonTheme
      baseColor="var(--color-elements)"
      highlightColor={
        isDark ? 'var(--color-elements)' : 'var(--color-hover-and-bg)'
      }
    >
      <article className="card">
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
                onClick={handleScrollToTop}
                to={`/${product.category}/${product.itemId}`}
              >
                <img
                  src={`${product.image}`}
                  alt={product.name}
                  className="card__img"
                />
              </Link>

              <Link to={`/${product.category}/${product.itemId}`}>
                <p className="card__model" title={product.name}>
                  {product.name}
                </p>
              </Link>
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
              <span className="card__price-current text-h3 tablet:text-h3-lg">
                ${product.price}
              </span>
              <span className="card__price-old">${product.fullPrice}</span>
            </div>
          )}

          <div className="card__info-container">
            {isLoading ? (
              <div className="flex flex-col">
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
                <div className="card__info-title-container text-small">
                  <span className="card__info-title">Screen</span>
                  <span className="card__info-title">Capacity</span>
                  <span className="card__info-title">RAM</span>
                </div>

                <div className="card__info-param-container text-small">
                  <span className="card__info-param">
                    {product.screen.replace("'", '”')}
                  </span>
                  <span className="card__info-param">
                    {addSpaceBetweenNumAndText(product.capacity)}
                  </span>
                  <span className="card__info-param">
                    {addSpaceBetweenNumAndText(product.ram)}
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
    </SkeletonTheme>
  );
};
