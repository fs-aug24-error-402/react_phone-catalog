import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { useWindowWidth } from './app/hooks';

function App() {
  const { isMobile } = useWindowWidth();
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const location = useLocation();

  const handleToggleAside = () => setIsAsideVisible(prev => !prev);

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

      <main
        className="flex-1 pt-24 pb-56 relative bg-hover-and-bg
      tablet:pb-64 desktop:pb-80"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
