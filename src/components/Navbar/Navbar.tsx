import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Navbar.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.nav__link, 'text-uppercase', {
    [styles['nav__link--active']]: isActive,
    'text-primary': isActive,
    'text-secondary': !isActive,
  });

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__items}>
          <NavLink to={'/'} end className={getLinkClass}>
            Home
          </NavLink>
        </li>

        <li className={styles.nav__items}>
          <NavLink to={'phones'} className={getLinkClass}>
            Phones
          </NavLink>
        </li>

        <li className={styles.nav__items}>
          <NavLink to={'tablets'} className={getLinkClass}>
            Tablets
          </NavLink>
        </li>

        <li className={styles.nav__items}>
          <NavLink to={'accessories'} className={getLinkClass}>
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
