import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
