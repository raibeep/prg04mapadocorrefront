import { Routes, Route } from 'react-router-dom'
import Login from './modules/auth/pages/Login'
import Negocios from './modules/negocios/pages/Negocios'
import LandingPage from './modules/landing_page/pages/LandingPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/negocios" element={<Negocios />} />
      </Routes>
    </>
  );
}

export default App
