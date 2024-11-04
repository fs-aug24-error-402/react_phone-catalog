import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default App;
