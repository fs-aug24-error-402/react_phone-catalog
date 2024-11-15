import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './ProductPage.module.scss';
import helper from '/src/styles/helpers/container.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import { Accessory, MobileDevice, Product } from '../../types';
import { getAccessoryById, getPhoneById, getTabletById } from '../../api';
import { getTechSpecs } from '../../utils';
import { useProducts, useTheme } from '../../app/hooks';

import { ProductNotFound } from '../ProductNotFound';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackNavLink } from '../../components/BackNavLink';
import { TechSpecsTable } from '../../components/TechSpecsTable';
import { ProductImageSlider } from '../../components/ProductImageSlider';
import { ColorSelector } from '../../components/ColorSelector';
import { CapacitySelector } from '../../components/CapacitySelector';
import { AddToCartButton } from '../../components/AddToCartButton';
import { AddToFavouritesButton } from '../../components/AddToFavouritesButton';
import { PhonesSlider } from '../../components/PhonesSlider';

export const ProductPage = () => {
  const { phoneId, tabletId, accessoryId } = useParams();
  const { products } = useProducts();
  const { isDark } = useTheme();

  const [product, setProduct] = useState<Product | null>(null);
  const [device, setDevice] = useState<MobileDevice | Accessory | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setDevice(null);
    setHasError(false);

    if (phoneId) {
      setProduct(products.find(({ itemId }) => itemId === phoneId) || null);

      getPhoneById(phoneId)
        .then(setDevice)
        .catch(() => setHasError(true));
    } else if (tabletId) {
      setProduct(products.find(({ itemId }) => itemId === tabletId) || null);

      getTabletById(tabletId)
        .then(setDevice)
        .catch(() => setHasError(true));
    } else if (accessoryId) {
      setProduct(products.find(({ itemId }) => itemId === accessoryId) || null);

      getAccessoryById(accessoryId)
        .then(setDevice)
        .catch(() => setHasError(true));
    } else {
      setHasError(true);
    }
  }, [phoneId, tabletId, accessoryId, products]);

  const techSpech = useMemo(
    () => (device ? getTechSpecs(device) : []),
    [device],
  );
  const techSpechPart = useMemo(() => techSpech.slice(0, 4), [techSpech]);

  const recomendedProductsList = products
    .filter(item => item.category === product?.category)
    .toSorted((p1, p2) => p2.year - p1.year)
    .slice(0, 16);

  //temp loader
  if (hasError) {
    return <ProductNotFound />;
  }

  return (
    <SkeletonTheme
      baseColor="var(--color-elements)"
      highlightColor={
        isDark ? 'var(--color-elements)' : 'var(--color-hover-and-bg)'
      }
    >
      <div className={cn(helper.container, styles.page)}>
        <Breadcrumbs className="col-span-full mb-24 tablet:mb-40" />

        <BackNavLink className="col-span-full mb-16" />

        <h2 className="col-span-full mb-32 tablet:mb-40">
          {device ? device.name : <Skeleton />}
        </h2>

        <section className={cn('col-span-full', styles.page__section)}>
          <div className={cn(styles.main, 'relative')}>
            <div className="col-span-full mb-40 tablet:col-span-7 tablet:mb-0 desktop:col-span-12">
              {device ? (
                <ProductImageSlider images={device.images} />
              ) : (
                <Skeleton height="100%" />
              )}
            </div>

            <div className="relative desktop:static col-span-full tablet:col-span-5 desktop:col-start-14 desktop:col-span-7">
              <span className="text-small text-secondary absolute top-0 right-0">
                {product ? `ID: ${product.id}` : <Skeleton width={50} />}
              </span>

              {device ? (
                device.colorsAvailable.length > 1 && (
                  <ColorSelector
                    label="Available colors"
                    id={device.id}
                    color={device.color}
                    colorsAvailable={device.colorsAvailable}
                  />
                )
              ) : (
                <Skeleton />
              )}

              {device ? (
                device.capacityAvailable.length > 1 && (
                  <CapacitySelector
                    id={device.id}
                    capacity={device.capacity}
                    capacityAvailable={device.capacityAvailable}
                  />
                )
              ) : (
                <Skeleton />
              )}

              <div className={cn(styles.controls__buy, styles.buy, 'mb-32')}>
                {device ? (
                  <div className="flex items-center gap-8 mb-16">
                    <span className="text-h2-lg">
                      {`$${device.priceDiscount}`}
                    </span>

                    <span className={styles['buy__price-regular']}>
                      {`$${device.priceRegular}`}
                    </span>
                  </div>
                ) : (
                  <Skeleton />
                )}

                {device && product ? (
                  <div className="flex gap-8">
                    <AddToCartButton
                      product={product}
                      className="flex-1 h-48"
                    />

                    <AddToFavouritesButton product={product} className="h-48" />
                  </div>
                ) : (
                  <Skeleton height={48} width="100%" />
                )}
              </div>

              {device ? <TechSpecsTable data={techSpechPart} /> : <Skeleton />}
            </div>
          </div>
        </section>

        <section
          className={cn(
            'col-span-full desktop:col-span-12',
            styles.page__section,
          )}
        >
          <h3 className={styles['page__section-title']}>
            {device ? 'About' : <Skeleton />}
          </h3>

          <div className="flex flex-col gap-32">
            {device ? (
              device.description.map(({ title, text }) => (
                <article key={title}>
                  <h4 className={'mb-16'}>{title}</h4>

                  {text.map((content, index) => (
                    <p key={index} className="text-secondary mb-16">
                      {content}
                    </p>
                  ))}
                </article>
              ))
            ) : (
              <Skeleton count={3} />
            )}
          </div>
        </section>

        <section
          className={cn(
            'col-span-full desktop:col-start-14 desktop:col-end-[-1]',
            styles.page__section,
          )}
        >
          <h3 className={styles['page__section-title']}>
            {device ? 'Tech specs' : <Skeleton />}
          </h3>

          {device ? (
            <TechSpecsTable data={techSpech} />
          ) : (
            <Skeleton count={3} />
          )}
        </section>
      </div>

      <section className={cn(styles.page__like, styles.page__section)}>
        <div className={styles.like}>
          <div className={styles.like__slider}>
            {device ? (
              <PhonesSlider
                data={recomendedProductsList!}
                title="You may also like"
              />
            ) : (
              <Skeleton height={300} />
            )}
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};
