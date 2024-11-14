import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './BurgerMenu.module.scss';
import { Navbar } from '../Navbar';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles['fav-cart__item'], { 'border-b-2 border-b-primary': isActive });

export const BurgerMenu = () => {
  return (
    <motion.aside
      className={cn(styles['burger-menu'], 'flex flex-col')}
      initial={{ opacity: 0, right: '-100%' }}
      animate={{ opacity: 1, right: 0 }}
      exit={{ opacity: 0, right: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn(styles['burger-menu__top'], 'flex-1 px-16')}>
        <Navbar />
      </div>

      <div className={cn(styles['burger-menu__bottom'], styles['fav-cart'])}>
        <NavLink to={'favourites'} className={getLinkClass}>
          <img
            src="img/icons/svg/icon-favourites.svg"
            alt="Link to page with favourites products"
            className={styles['fav-cart__icon']}
          />
        </NavLink>

        <NavLink to={'cart'} className={getLinkClass}>
          <img
            src="img/icons/svg/icon-shoping-cart.svg"
            alt="Link to cart page"
            className={styles['fav-cart__icon']}
          />
        </NavLink>
      </div>
    </motion.aside>
  );
};