import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <header></header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
