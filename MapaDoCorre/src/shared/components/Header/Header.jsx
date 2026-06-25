// src/shared/components/Header/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="topbar">
      <Link to="/" className="logo-link">
        <img src="/favicon.png" alt="Logo Mapa do Corre" className="logo-img" />
      </Link>

      <nav className="topbar-links">
        <Link to="/">Início</Link>
        <Link to="/sobre">Como funciona</Link>
        <Link to="/auth">Cadastrar negócio</Link>
      </nav>

      <div className="topbar-right">
        <Link to="/auth" className="btn-login-header">Entrar</Link>
        <button className="btn-menu" onClick={toggleMenu} aria-label="Abrir menu">
          ☰
        </button>
      </div>

      {/* menu lateral — aparece só no mobile */}
      <div className={`topbar-nav ${isMenuOpen ? "topbar-nav-open" : ""}`}>
        <button type="button" className="meu-close" onClick={closeMenu}>✕</button>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <Link to="/sobre" onClick={closeMenu}>Como funciona</Link>
        <Link to="/auth" onClick={closeMenu}>Cadastrar negócio</Link>
        <Link to="/auth" onClick={closeMenu}>Entrar</Link>
      </div>

    </header>
  );
}

export default Header;