import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink to="/negocios" className={({ isActive }) => isActive ? 'active' : ''}>
            Negócios
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
