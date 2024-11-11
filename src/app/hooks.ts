import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from './store';
import { windowWidthActions, productsActions } from '../features';
import { getProducts } from '../api';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWindowWidth = () => {
  const dispatch = useAppDispatch();
  const windowWidth = useAppSelector(state => state.windowWidth);
  const isMobile = windowWidth < 640;

  const { setWindowWidth } = windowWidthActions;

  useEffect(() => {
    const handleResize = () => dispatch(setWindowWidth(window.innerWidth));

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { windowWidth, isMobile };
};

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);

  const { setProducts } = productsActions;

  useEffect(() => {
    getProducts()
      .then(products => dispatch(setProducts(products)))
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products };
};
