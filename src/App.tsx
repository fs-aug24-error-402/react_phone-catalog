import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { CartItem } from './components/CartItem/CartItem';

function App() {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 640;
  const location = useLocation();

  const handleToggleAside = () => setIsAsideVisible(prev => !prev);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAsideVisible) {
      setIsAsideVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="app flex flex-col min-h-screen">
      <Header
        isMobile={isMobile}
        isAsideVisible={isAsideVisible}
        onToggleAside={handleToggleAside}
      />

      <AnimatePresence>
        {isAsideVisible && isMobile && <BurgerMenu />}
      </AnimatePresence>

      <main className="flex-1">
        <Outlet />
        <CartItem />
      </main>

      <Footer />
    </div>
  );
}

export default App;
