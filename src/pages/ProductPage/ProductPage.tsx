import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './ProductPage.module.scss';
import helper from '/src/styles/helpers/container.module.scss';

import { MobileDevice } from '../../types';
import { getPhoneById } from '../../api';
import {
  getProductColor,
  addSpaceBetweenNumAndText,
  getTechSpecs,
} from '../../utils';

import { ProductNotFound } from '../ProductNotFound';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackNavLink } from '../../components/BackNavLink';
import { TechSpecsTable } from '../../components/TechSpecsTable';
import { Button } from '../../components/Button';
import { useProducts } from '../../app/hooks';

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

    productId.current =
      products.find(({ itemId }) => itemId === phoneId)?.id || 0;

    if (phoneId) {
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

  const getLinkToAnotherModel = useCallback(
    (prevValue: string, value: string) => {
      const newId = device?.id
        .split('-')
        .map(part =>
          part === prevValue.toLowerCase() ? value.toLowerCase() : part,
        )
        .join('-');

      return `../${newId}`;
    },
    [device?.id],
  );

  //temp loader
  if (!device) {
    return hasError ? <ProductNotFound /> : <Loader />;
  }

  const {
    name,
    priceDiscount,
    priceRegular,
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    description,
  } = device;

  return (
    <>
      <div className={cn(helper.container, styles.page)}>
        <Breadcrumbs className="col-span-full mb-24 tablet:mb-40" />

        <BackNavLink className="col-span-full mb-16" />

        <h2 className="col-span-full mb-32 tablet:mb-40">{name}</h2>

        <section className={cn('col-span-full', styles.page__section)}>
          <div className={cn(styles.main, 'relative')}>
            <div className="col-span-full mb-40 tablet:col-span-7 tablet:mb-0 desktop:col-span-12">
              images
            </div>

            <div className="col-span-full tablet:col-span-5 desktop:col-start-14 desktop:col-span-7">
              <div
                className={cn('relative desktop:static', {
                  'pb-24 mb-24 border-b border-elements':
                    colorsAvailable.length > 1,
                })}
              >
                {colorsAvailable.length > 1 && (
                  <>
                    <p className="text-small text-secondary mb-8">
                      Available colors
                    </p>

                    <div className="flex gap-8">
                      {colorsAvailable.map(curColor => (
                        <Link
                          key={curColor}
                          to={getLinkToAnotherModel(color, curColor)}
                          className={cn(
                            getProductColor(curColor),
                            'rounded-lg h-32 aspect-square',
                            'border-2 border-white',
                            'outline outline-1 outline-elements',
                            'hover:outline-icons',
                            'transition-outline duration-300 ease-in-out',
                            {
                              'outline-primary pointer-events-none':
                                color === curColor,
                            },
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                <span className="text-small text-secondary absolute top-0 right-0">
                  ID: {productId.current}
                </span>
              </div>

              {capacityAvailable.length > 1 && (
                <div className="pb-24 mb-24 border-b border-elements">
                  <p className="text-small text-secondary mb-8">
                    Select capacity
                  </p>

                  <div className="flex gap-8">
                    {capacityAvailable.map(curCapacity => {
                      const isActive =
                        curCapacity.replace(' ', '') === capacity;

                      return (
                        <Link
                          key={curCapacity}
                          to={getLinkToAnotherModel(capacity, curCapacity)}
                          className={cn(
                            'rounded h-32 px-8 flex items-center leading border hover:border-primary',
                            'transition-bg duration-300 ease-in-out',
                            {
                              'bg-white border-icons text-primary': !isActive,
                              'bg-primary border-primary text-white pointer-events-none':
                                isActive,
                            },
                          )}
                        >
                          {addSpaceBetweenNumAndText(curCapacity)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={cn(styles.controls__buy, styles.buy, 'mb-32')}>
                <div className="flex items-center gap-8 mb-16">
                  <span className="text-h2-lg">{`$${priceDiscount}`}</span>

                  <span
                    className={styles['buy__price-regular']}
                  >{`$${priceRegular}`}</span>
                </div>

                <div className="flex gap-8">
                  <Button className="flex-1 h-48">Add to cart</Button>

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
              </div>

              <TechSpecsTable data={techSpechPart} />
            </div>
          </div>
        </section>

        <section
          className={cn(
            'col-span-full desktop:col-span-12',
            styles.page__section,
          )}
        >
          <h3 className={styles['page__section-title']}>About</h3>

          <div className="flex flex-col gap-32">
            {description.map(({ title, text }) => (
              <article key={title}>
                <h4 className={'mb-16'}>{title}</h4>

                {text.map((content, index) => (
                  <p key={index} className={'text-secondary'}>
                    {content}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section
          className={cn(
            'col-span-full desktop:col-start-14 desktop:col-end-[-1]',
            styles.page__section,
          )}
        >
          <h3 className={styles['page__section-title']}>Tech specs</h3>

          <TechSpecsTable data={techSpech} />
        </section>
      </div>

      <section className={cn(styles.page__like, styles.page__section)}>
        <div className={styles.like}>
          <div className={helper.container}>
            <h2 className={styles.like__title}>You may also like</h2>
          </div>

          <div className={styles.like__slider}>slider</div>
        </div>
      </section>
    </>
  );
};
