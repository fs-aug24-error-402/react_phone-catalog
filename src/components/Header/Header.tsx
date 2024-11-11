import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';

import styles from './Header.module.scss';
import { Navbar } from '../Navbar';
import { ProductCounter } from '../ProductCounter/ProductCounter';
import { useAppSelector } from '../../hooks/useAppSelector';
const getLinkClass = (isActive: boolean) =>
  cn(styles.header__icon, {
    [styles['header__icon--active']]: isActive,
  });

interface Props {
  isMobile: boolean;
  isAsideVisible: boolean;
  onToggleAside: () => void;
}

export const Header: FC<Props> = ({
  isMobile,
  isAsideVisible,
  onToggleAside,
}) => {
  const { addedProducts, totalCount } = useAppSelector(
    state => state.addedProducts,
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div
            className={cn(
              styles.header__logo,
              styles.logo,
              'mr-16 desktop:mr-24',
            )}
          >
            <Link to={'/'}>
              <img
                src="img/logo.svg"
                alt="Nice Gadgets Logo"
                className={cn(styles.logo__img, 'px-16 desktop:px-24')}
              />
            </Link>
          </div>

          {!isMobile && <Navbar />}
        </div>

        <div className={styles.header__right}>
          {isMobile && (
            <div
              className={cn(styles.header__icon, {
                [styles['header__icon--close']]: isAsideVisible,
                [styles['header__icon--open']]: !isAsideVisible,
              })}
              onClick={onToggleAside}
            />
          )}

          {!isMobile && (
            <>
              <NavLink
                to={'favourites'}
                className={({ isActive }) =>
                  cn(getLinkClass(isActive), styles['header__icon--fav'])
                }
              >
                {!!addedProducts.favorites.length && (
                  <ProductCounter count={addedProducts.favorites.length} />
                )}
              </NavLink>

              <NavLink
                to={'cart'}
                className={({ isActive }) =>
                  cn(getLinkClass(isActive), styles['header__icon--cart'])
                }
              >
                {!!totalCount.item && (
                  <ProductCounter count={totalCount.item} />
                )}
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
};
