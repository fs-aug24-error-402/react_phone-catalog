import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import cn from 'classnames';

import styles from './BurgerMenu.module.scss';
import { Navbar } from '../Navbar';
import { useTheme } from '../../app/hooks';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ProductCounter } from '../ProductCounter';

const getLinkClass = (isActive: boolean, isDark: boolean) =>
  cn(styles['fav-cart__item'], {
    'border-b-2 border-b-primary': isActive,
    'shadow-[-1px_0_#E2E6E9]': !isDark,
    'shadow-[-1px_0_#323542]': isDark,
  });

export const BurgerMenu = () => {
  const { isDark } = useTheme();
  const { addedProducts, totalCount } = useAppSelector(
    state => state.addedProducts,
  );

  return (
    <motion.aside
      className={cn(styles['burger-menu'], 'flex flex-col', {
        'bg-white': !isDark,
        'bg-black': isDark,
      })}
      initial={{ opacity: 0, right: '-100%' }}
      animate={{ opacity: 1, right: 0 }}
      exit={{ opacity: 0, right: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn(styles['burger-menu__top'], 'flex-1 px-16')}>
        <Navbar />
      </div>

      <div className={cn(styles['burger-menu__bottom'], styles['fav-cart'])}>
        <NavLink
          to={'favourites'}
          className={props => getLinkClass(props.isActive, isDark)}
        >
          <div className="py-24 relative">
            <FiHeart className="h-16 w-16" />

            {!!addedProducts.favorites.length && (
              <ProductCounter count={addedProducts.favorites.length} />
            )}
          </div>
        </NavLink>

        <NavLink
          to={'cart'}
          className={props => getLinkClass(props.isActive, isDark)}
        >
          <div className="py-24 relative">
            <FiShoppingBag className="h-16 w-16" />

            {!!totalCount.item && <ProductCounter count={totalCount.item} />}
          </div>
        </NavLink>
      </div>
    </motion.aside>
  );
};
