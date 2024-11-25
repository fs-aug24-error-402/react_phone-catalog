import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { useInactivityTimer } from './hooks/useInactivityTimer';
import { SubscribeModal } from './components/SubscribeModal';
import { useLockScroll } from './hooks/useLockScroll';
import { useTheme, useWindowWidth } from './app/hooks';
import cn from 'classnames';
import { LogoutModule } from './components/LogoutModal/LogoutModal';

function App() {
  const { isMobile } = useWindowWidth();
  const { isDark } = useTheme();
  const location = useLocation();

  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [hasModalBeenShown, setHasModalBeenShown] = useState(false);

  const handleToggleAside = () => setIsAsideVisible(prev => !prev);

  useInactivityTimer(20000, () => {
    if (!hasModalBeenShown && !showLogoutModal) {
      setShowSubscriptionModal(true);
      setHasModalBeenShown(true);
    }
  });

  useLockScroll(showSubscriptionModal);
  useLockScroll(isAsideVisible);
  useLockScroll(showLogoutModal);

  useEffect(() => {
    if (isAsideVisible) {
      setIsAsideVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (!isMobile) {
      setIsAsideVisible(false);
    }
  }, [isMobile]);

  return (
    <div
      className={cn('app flex flex-col min-h-screen', {
        'theme-dark': isDark,
      })}
    >
      <Header
        isMobile={isMobile}
        isAsideVisible={isAsideVisible}
        onToggleAside={handleToggleAside}
        onShowLogOutModal={setShowLogoutModal}
      />

      <AnimatePresence>
        {isAsideVisible && isMobile && <BurgerMenu />}
      </AnimatePresence>

      <main
        className="flex-1 pt-24 pb-56 relative bg-hover-and-bg
         tablet:pb-64 desktop:pb-80"
      >
        <Modal
          contentLabel="subscribeModal"
          isOpen={showSubscriptionModal}
          onRequestClose={() => setShowSubscriptionModal(false)}
          ariaHideApp={false}
          className={cn(
            'mt-10 flex flex-col gap-4 text-primary',
            'rounded-lg shadow-lg focus:outline-none',
          )}
          overlayClassName={cn(
            'flex justify-center items-center',
            'z-40 fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm',
          )}
        >
          <SubscribeModal onClose={() => setShowSubscriptionModal(false)} />
        </Modal>

        <Modal
          contentLabel="logOutModal"
          isOpen={showLogoutModal}
          onRequestClose={() => setShowLogoutModal(false)}
          ariaHideApp={false}
          className={cn(
            'mt-10 flex flex-col gap-4 text-primary',
            'rounded-lg shadow-lg focus:outline-none',
          )}
          overlayClassName={cn(
            'flex justify-center items-center',
            'z-40 fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm',
          )}
        >
          <LogoutModule onClose={() => setShowLogoutModal(false)} />
        </Modal>

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
