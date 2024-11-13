/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './ProductPage.module.scss';
import helper from '/src/styles/helpers/container.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import { MobileDevice } from '../../types';
import { getPhoneById } from '../../api';
import { getTechSpecs } from '../../utils';
import { useProducts } from '../../app/hooks';

import { ProductNotFound } from '../ProductNotFound';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackNavLink } from '../../components/BackNavLink';
import { TechSpecsTable } from '../../components/TechSpecsTable';
import { Button } from '../../components/Button';
import { ProductImageSlider } from '../../components/ProductImageSlider';
import { ColorSelector } from '../../components/ColorSelector';
import { CapacitySelector } from '../../components/CapacitySelector';

export const ProductPage = () => {
  const { phoneId } = useParams();
  const { products } = useProducts();
  const isInFavourites = false;
  const productId = useRef(0);

  const [device, setDevice] = useState<MobileDevice | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setDevice(null);
    setHasError(false);

    if (phoneId) {
      productId.current =
        products.find(({ itemId }) => itemId === phoneId)?.id || 0;

      getPhoneById(phoneId)
        .then(setDevice)
        .catch(() => setHasError(true));
    } else {
      //Temp solution
      setHasError(true);
    }
  }, [phoneId, products]);

  const techSpech = useMemo(
    () => (device ? getTechSpecs(device) : []),
    [device],
  );
  const techSpechPart = useMemo(() => techSpech.slice(0, 4), [techSpech]);

  //temp loader
  if (!device && hasError) {
    return <ProductNotFound />;
  }

  return (
    <>
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
                {device ? `ID: ${productId.current}` : <Skeleton width={50} />}
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

                {device ? (
                  <div className="flex gap-8">
                    <Button className="flex-1">Add to cart</Button>

                    <button
                      onClick={() => {}}
                      className="rounded-lg h-48 aspect-square bg-white border border-icons flex items-center justify-center hover:border-primary transition-border duration-300 ease-in-out"
                    >
                      <img
                        src={
                          isInFavourites
                            ? 'img/icons/svg/icon-favourites-filled.svg'
                            : 'img/icons/svg/icon-favourites.svg'
                        }
                        alt="Icon for add to favourites button"
                      />
                    </button>
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
                    <p key={index} className={'text-secondary'}>
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
          <div className={helper.container}>
            <h2 className={styles.like__title}>
              {device ? 'You may also like' : <Skeleton />}
            </h2>
          </div>

          <div className={styles.like__slider}>
            {device ? 'slider' : <Skeleton height={300} />}
          </div>
        </div>
      </section>
    </>
  );
};
