import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';
import { FiHeart, FiShoppingBag, FiX, FiMenu } from 'react-icons/fi';
import { SlLogout, SlLogin } from 'react-icons/sl';
import { useAuth } from '../../contexts/authContext';

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
  onShowLogOutModal: (toShow: boolean) => void;
}

export const Header: FC<Props> = ({
  isMobile,
  isAsideVisible,
  onToggleAside,
  onShowLogOutModal,
}) => {
  const { isDark } = useTheme();
  const { addedProducts, totalCount } = useAppSelector(
    state => state.addedProducts,
  );
  const { userLoggedIn } = useAuth();

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

              {userLoggedIn ? (
                <button
                  onClick={() => onShowLogOutModal(true)}
                  className={cn(
                    getLinkClass(false),
                    styles['header__icon--fav'],
                    {
                      'shadow-[-1px_0_#E2E6E9]': !isDark,
                      'shadow-[-1px_0_#323542]': isDark,
                    },
                  )}
                >
                  <div className="relative">
                    <SlLogout className="h-16 w-16" />
                  </div>
                </button>
              ) : (
                <NavLink
                  to={'registration'}
                  className={({ isActive }) =>
                    cn(getLinkClass(isActive), styles['header__icon--fav'], {
                      'shadow-[-1px_0_#E2E6E9]': !isDark,
                      'shadow-[-1px_0_#323542]': isDark,
                    })
                  }
                >
                  <div className="relative">
                    <SlLogin className="h-16 w-16" />
                  </div>
                </NavLink>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};
