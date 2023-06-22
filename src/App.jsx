import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Cadastrar from './pages/Cadastrar';
import UserContext from './contexts/UserContext';
import Erro404 from './pages/Erro404';
import Home from './pages/Home';
import Login from './pages/Login';
import Novo from './pages/Novo';
import './App.css';

export default function App() {
  const { logado, handleLogout } = useContext(UserContext);

  useEffect(() => {
    const handleUnload = () => {
      handleLogout();
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleLogout]);

  return (
    <BrowserRouter>
      <Routes>
        {logado ? (
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Novo />} />
          </Route>
        ) : (
          <Route index element={<Login />} />
        )}
        <Route path="cadastro" element={<Cadastrar />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  );
}
