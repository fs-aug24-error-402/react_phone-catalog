import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './ProductPage.module.scss';
import helper from '/src/styles/helpers/container.module.scss';

import { getPhoneById, getProductById } from '../../api';
import { getProductColor, addSpaceBetweenNumAndText } from '../../utils';
import { MobileDevice } from '../../types';

import { BackNavLink } from '../../components/BackNavLink';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { ProductNotFound } from '../ProductNotFound';
import { Loader } from '../../components/Loader';

export const ProductPage = () => {
  const [device, setDevice] = useState<MobileDevice | null>(null);
  const [hasError, setHasError] = useState(false);
  const pathname = useLocation().pathname.split('/');
  const productId = pathname[pathname.length - 1];

  useEffect(() => {
    setDevice(null);
    setHasError(false);

    getProductById(+productId)
      .then(product => {
        if (product.category === 'phones') {
          getPhoneById(product.itemId)
            .then(setDevice)
            .catch(() => setHasError(true));
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }, [productId]);

  //temp loader
  if (!device) {
    return hasError ? <ProductNotFound /> : <Loader />;
  }

  const { name, priceDiscount, priceRegular } = device;

  const isInFavourites = false;

  return (
    <>
      <div className={cn(helper.container, styles.page)}>
        <div className="col-span-full mb-24 tablet:mb-40">
          <Breadcrumbs lastItem={name} />
        </div>

        <div className="col-span-full mb-16">
          <BackNavLink />
        </div>

        <h2 className="col-span-full mb-32 tablet:mb-40">{name}</h2>

        <section className={cn('col-span-full', styles.page__section)}>
          <div className={cn(styles.main, 'relative')}>
            <div className="col-span-full mb-40 tablet:col-span-7 tablet:mb-0 desktop:col-span-12">
              images
            </div>

            <div className="col-span-full tablet:col-span-5 desktop:col-start-14 desktop:col-span-7">
              <div className="pb-24 mb-24 border-b border-elements relative desktop:static">
                <p className="text-small text-secondary mb-8">
                  Available colors
                </p>

                <div className="flex gap-8">
                  {['red', 'blue'].map(curColor => (
                    <Link
                      key={curColor}
                      to="."
                      className={cn(
                        getProductColor(curColor),
                        'rounded-lg h-32 aspect-square',
                        'border-2 border-white',
                        'outline outline-1 outline-elements',
                        'hover:outline-icons',
                        'transition-outline duration-300 ease-in-out',
                        {
                          'outline-primary pointer-events-none': false,
                        },
                      )}
                    />
                  ))}
                </div>

                <span className="text-small text-secondary absolute top-0 right-0">
                  ID: {productId}
                </span>
              </div>

              <div className="pb-24 mb-24 border-b border-elements">
                <p className="text-small text-secondary mb-8">
                  Select capacity
                </p>

                <div className="flex gap-8">
                  {['64GB', '128GB'].map(curCapacity => {
                    const isActive = false;

                    return (
                      <Link
                        key={curCapacity}
                        to="."
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

              <div className={cn(styles.controls__buy, styles.buy, 'mb-32')}>
                <div className="flex items-center gap-8 mb-16">
                  <span className="text-h2-lg">{`$${priceDiscount}`}</span>

                  <span
                    className={styles['buy__price-regular']}
                  >{`$${priceRegular}`}</span>
                </div>

                <div className="flex gap-8">
                  <Button className="flex-1 h-48">Add to cart</Button>

                  <Link
                    to="."
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
                  </Link>
                </div>
              </div>

              <div>table</div>
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
            <article>
              <h4 className={'mb-16'}>Title 1</h4>

              <p className={'text-secondary'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem,
                delectus magni qui possimus voluptatum, corporis illo
                perspiciatis, aliquid molestiae hic excepturi autem. Obcaecati
                exercitationem cupiditate ex nihil quibusdam laudantium nulla.
              </p>
            </article>
          </div>
        </section>

        <section
          className={cn(
            'col-span-full desktop:col-start-14 desktop:col-end-[-1]',
            styles.page__section,
          )}
        >
          <h3 className={styles['page__section-title']}>Tech specs</h3>

          <div>Table</div>
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
