import { NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import { motion } from 'framer-motion';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles['fav-cart__item'], { 'border-b-2 border-b-primary': isActive });

export const BurgerMenu = () => {
  return (
    <motion.aside
      className={cn(styles['burger-menu'], 'flex flex-col')}
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%' }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn(styles['burger-menu__top'], 'flex-1 px-16')}>
        <Navbar />
      </div>

      <div className={cn(styles['burger-menu__bottom'], styles['fav-cart'])}>
        <NavLink to={'favourites'} className={getLinkClass}>
          <img
            src="img/icons/png/Favourites (Heart Like).png"
            alt="Link to page with favourites products"
            className={styles['fav-cart__icon']}
          />
        </NavLink>

        <NavLink to={'cart'} className={getLinkClass}>
          <img
            src="img/icons/png/shopping-bag-(cart).png"
            alt="Link to cart page"
            className={styles['fav-cart__icon']}
          />
        </NavLink>
      </div>
    </motion.aside>
  );
};
