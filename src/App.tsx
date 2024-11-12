import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { useInactivityTimer } from './hooks/useInactivityTimer';
import { ModalContent } from './components/Modal/ModalContent';
import { useLockScroll } from './hooks/useLockScroll';
import { useWindowWidth } from './app/hooks';

function App() {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasModalBeenShown, setHasModalBeenShown] = useState(false);

  const { isMobile } = useWindowWidth();
  const location = useLocation();

  const handleToggleAside = () => setIsAsideVisible(prev => !prev);

  useInactivityTimer(10000, () => {
    if (!hasModalBeenShown) {
      setShowModal(true);
      setHasModalBeenShown(true);
    }
  });

  useLockScroll(showModal);

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

      <main className="flex-1 pt-24 pb-56 relative bg-hover-and-bg tablet:pb-64 desktop:pb-80">
        <Modal
          contentLabel="Modal"
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          ariaHideApp={false}
          className=" mt-10 flex flex-col gap-4 text-black rounded-lg shadow-lg focus:outline-none"
          overlayClassName="z-40 fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
        >
          <ModalContent onClose={() => setShowModal(false)} />
        </Modal>

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
