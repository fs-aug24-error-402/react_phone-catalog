import { Link } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';

interface Props {
  isAsideVisible: boolean;
  onToggleAside: () => void;
}

export const Header: FC<Props> = ({ isAsideVisible, onToggleAside }) => {
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
                src="img/logo.png"
                alt="Nice Gadgets Logo"
                className={cn(styles.logo__img, 'px-16 desktop:px-24')}
              />
            </Link>
          </div>
        </div>

        <div className={styles.header__right}>
          <div
            className={cn(
              styles.header__icon,
              `${isAsideVisible ? styles['burger-close'] : styles['burger-open']}`,
            )}
            onClick={onToggleAside}
          />
        </div>
      </header>
    </>
  );
};
