import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from './pages/RightsPage';
import { LogInPage } from './pages/LogInPage';
import { AuthProvider } from './contexts/authContext';

export const Root = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="registration" element={<LogInPage />} />
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="phones">
                <Route index element={<PhonesPage />} />
                <Route path=":phoneId" element={<ProductPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<TabletsPage />} />
                <Route path=":tabletId" element={<ProductPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<AccessoriesPage />} />
                <Route path=":accessoryId" element={<ProductPage />} />
              </Route>

              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="contacts" element={<ContactsPage />} />
              <Route path="rights" element={<RightsPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
};
