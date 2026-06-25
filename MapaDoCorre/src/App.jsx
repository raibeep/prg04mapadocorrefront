import { Routes, Route } from 'react-router-dom';

import LandingPage from './modules/landing_page/pages/LandingPage';
import AuthStart from './modules/auth/pages/AuthStart';
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/Register';
import SelectProfile from './modules/auth/pages/SelectProfile';

import Negocios from './modules/negocios/pages/Negocios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthStart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/negocios" element={<Negocios />} />
      <Route path='selecionar-perfil' element={<SelectProfile />} />
    </Routes>
  );
}

export default App;