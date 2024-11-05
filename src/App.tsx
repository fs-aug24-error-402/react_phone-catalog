import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';

function App() {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const location = useLocation();

  const handleToggleAside = () => setIsAsideVisible(prev => !prev);

  useEffect(() => {
    if (isAsideVisible) {
      setIsAsideVisible(false);
    }
  }, [isAsideVisible, location]);

  return (
    <div className="app flex flex-col min-h-screen">
      <Header
        isAsideVisible={isAsideVisible}
        onToggleAside={handleToggleAside}
      />

      <AnimatePresence>{isAsideVisible && <BurgerMenu />}</AnimatePresence>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
