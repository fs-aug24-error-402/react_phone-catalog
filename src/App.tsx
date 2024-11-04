
import './App.scss';
import { Card } from './componentes/Card';

function App() {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
        <Card />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
