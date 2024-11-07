import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';

import styles from './Header.module.scss';
import { Navbar } from '../Navbar';

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
              />

              <NavLink
                to={'cart'}
                className={({ isActive }) =>
                  cn(getLinkClass(isActive), styles['header__icon--cart'])
                }
              >
                <div
                  className="absolute top-16 right-16 flex items-center justify-center w-16 h-16
                    text-white text-center text-[9px] font-bold
                    bg-accent border border-solid border-white rounded-full"
                >
                  1
                </div>
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
};
