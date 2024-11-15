import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';
import { FiHeart, FiShoppingBag, FiX, FiMenu } from 'react-icons/fi';
import cn from 'classnames';

import styles from './Header.module.scss';
import { Navbar } from '../Navbar';
import { ProductCounter } from '../ProductCounter';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ToggleThemeButton } from '../ToggleThemeButton';
import { useTheme } from '../../app/hooks';
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
  const { isDark } = useTheme();
  const { addedProducts, totalCount } = useAppSelector(
    state => state.addedProducts,
  );

  return (
    <>
      <header
        className={cn(styles.header, {
          'bg-white shadow-[0_1px_#E2E6E9]': !isDark,
          'bg-black shadow-[0_1px_#323542]': isDark,
        })}
      >
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
                src={isDark ? 'img/logo-dark.svg' : 'img/logo.svg'}
                alt="Nice Gadgets Logo"
                className={cn(styles.logo__img, 'px-16 desktop:px-24')}
              />
            </Link>
          </div>

          {!isMobile && <Navbar />}
        </div>

        <div className={styles.header__right}>
          <div className={styles.header__toggle}>
            <ToggleThemeButton />
          </div>

          {isMobile && (
            <div
              className={cn(styles.header__icon, {
                'shadow-[-1px_0_#E2E6E9]': !isDark,
                'shadow-[-1px_0_#323542]': isDark,
              })}
              onClick={onToggleAside}
            >
              {isAsideVisible ? (
                <FiX className="h-16 w-16" />
              ) : (
                <FiMenu className="h-16 w-16" />
              )}
            </div>
          )}

          {!isMobile && (
            <>
              <NavLink
                to={'favourites'}
                className={({ isActive }) =>
                  cn(getLinkClass(isActive), styles['header__icon--fav'], {
                    'shadow-[-1px_0_#E2E6E9]': !isDark,
                    'shadow-[-1px_0_#323542]': isDark,
                  })
                }
              >
                <div className="relative">
                  <FiHeart className="h-16 w-16" />

                  {!!addedProducts.favorites.length && (
                    <ProductCounter count={addedProducts.favorites.length} />
                  )}
                </div>
              </NavLink>

              <NavLink
                to={'cart'}
                className={({ isActive }) =>
                  cn(getLinkClass(isActive), styles['header__icon--cart'], {
                    'shadow-[-1px_0_#E2E6E9]': !isDark,
                    'shadow-[-1px_0_#323542]': isDark,
                  })
                }
              >
                <div className="relative">
                  <FiShoppingBag className="h-16 w-16" />

                  {!!totalCount.item && (
                    <ProductCounter count={totalCount.item} />
                  )}
                </div>
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
};
