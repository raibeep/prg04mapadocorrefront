import { Routes, Route } from 'react-router-dom'
import Header from './shared/components/Header/Header'
import Navbar from './shared/components/Navbar/Navbar'
import Footer from './shared/components/Footer/Footer'
import Feed from './modules/feed/pages/Feed'
import Login from './modules/login/pages/Login'
import Admin from './modules/admin/pages/Admin'
import Negocios from './modules/negocios/pages/Negocios'

function App() {
  return (
    <>

      <Header />
      <Navbar />
      <div class="pagina">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/negocios" element={<Negocios />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
