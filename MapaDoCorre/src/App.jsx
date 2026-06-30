import { Routes, Route } from 'react-router-dom';
import RotaProtegida from './shared/components/RotaProtegida';

import LandingPage from './modules/landing_page/pages/LandingPage';
import AuthStart from './modules/auth/pages/AuthStart';
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/Register';
import SelectProfile from './modules/auth/pages/SelectProfile';
import Home from './modules/home/pages/Home';
import ProfilePage from './modules/profile/pages/ProfilePage';
import Dashboard from './modules/empresario/pages/Dashboard';
import CadastroNegocio from './modules/negocio/pages/CadastroNegocio';
import EmpresarioPage from './modules/empresario/pages/EmpresarioPage'
import EditProfile from './modules/profile/pages/EditProfile';
import EditNegocio from "./modules/negocio/pages/EditNegocio";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthStart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/selecionar-perfil" element={<SelectProfile />} />

      {/* Cliente */}
      <Route path="/home" element={
        <RotaProtegida perfil="CLIENTE">
          <Home />
        </RotaProtegida>
      } />
      <Route path="/tela-perfil" element={
        <RotaProtegida perfil="CLIENTE">
          <ProfilePage />
        </RotaProtegida>
      } />
      <Route
        path="/editar-perfil"
        element={
          <RotaProtegida perfil="CLIENTE">
            <EditProfile />
          </RotaProtegida>
        }
      />
      {/*<Route path="/negocios" element={
        <RotaProtegida perfil="CLIENTE">
          <Negocios />
        </RotaProtegida>
      } />*/}

      {/* Empresário */}
      <Route path="/dashboard" element={
        <RotaProtegida perfil="EMPRESARIO">
          <Dashboard />
        </RotaProtegida>
      } />
      <Route path="/cadastro-negocio" element={
        <RotaProtegida perfil="EMPRESARIO">
          <CadastroNegocio />
        </RotaProtegida>
      } />
      <Route path="/perfil-empresario" element={
        <RotaProtegida perfil="EMPRESARIO">
          <EmpresarioPage />
        </RotaProtegida>
      } />
      <Route
        path="/editar-perfil-empresario"
        element={
          <RotaProtegida perfil="EMPRESARIO">
            <EditProfile />
          </RotaProtegida>
        }
      />
      <Route
        path="/editar-negocio/:id"
        element={
          <RotaProtegida perfil="EMPRESARIO">
            <EditNegocio />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}

export default App;