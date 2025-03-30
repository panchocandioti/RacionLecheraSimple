import './App.css';
import Presentacion from './components/Presentacion';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0); // Al cargar la página, sube al inicio
  }, []);

  return (
    <div className='App'>
      <Presentacion />
    </div>
  );
}

export default App;