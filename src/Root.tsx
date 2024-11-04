import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />

          <Route path="*" element={<p>Page not found</p>} />
        </Route>
      </Routes>
    </Router>
  );
};
