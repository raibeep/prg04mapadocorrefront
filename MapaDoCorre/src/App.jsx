import { Routes, Route } from 'react-router-dom';
import RotaProtegida from './shared/components/RotaProtegida';

import LandingPage from './modules/auth/pages/LandingPage';
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
import DetalhesNegocio from "./modules/negocio/pages/DetalhesNegocio"
import MinhaLoja from "./modules/empresario/pages/MinhaLoja";
import { CarrinhoProvider } from "./shared/context/CarrinhoContext";
import CarrinhoDrawer from "./modules/carrinho/components/CarrinhoDrawer";
import Checkout from "./modules/pagamento/pages/Checkout";
import PedidoSucesso from "./modules/pagamento/pages/PedidoSucesso";
import MeusPedidos from "./modules/pedido/pages/MeusPedidos";
import EmpresarioPedidos from "./modules/pedido/pages/EmpresarioPedidos";

function App() {
  return (
    <CarrinhoProvider>

      <CarrinhoDrawer />

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
        <Route
          path="/detalhes-negocio/:id"
          element={
            <RotaProtegida perfil="CLIENTE">
              <DetalhesNegocio />
            </RotaProtegida>
          }
        />

        <Route
          path="/checkout"
          element={
            <RotaProtegida perfil="CLIENTE">
              <Checkout />
            </RotaProtegida>
          }
        />

        <Route
          path="/pedido-sucesso"
          element={
            <RotaProtegida perfil="CLIENTE">
              <PedidoSucesso />
            </RotaProtegida>
          }
        />

        <Route
          path="/meus-pedidos"
          element={
            <RotaProtegida perfil="CLIENTE">
              <MeusPedidos />
            </RotaProtegida>
          }
        />


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

        <Route
          path="/minha-loja/:id"
          element={
            <RotaProtegida perfil="EMPRESARIO">
              <MinhaLoja />
            </RotaProtegida>
          }
        />

        <Route
          path="/pedidos"
          element={
            <RotaProtegida perfil="EMPRESARIO">
              <EmpresarioPedidos />
            </RotaProtegida>
          }
        />
      </Routes>

    </CarrinhoProvider>
  );
}

export default App;