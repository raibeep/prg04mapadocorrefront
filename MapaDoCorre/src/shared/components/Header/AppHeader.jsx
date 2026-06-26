import { Link } from "react-router-dom";
import userDefault from "../../../assets/images/user.png";
import "./AppHeader.css";

function AppHeader({
    showSearch = false,
    onSearch,
    profileRoute = "/tela-perfil"
}) {
    const nome = localStorage.getItem("nomeUsuario") || "";
    const inicial = nome.charAt(0).toUpperCase();

    return (
        <header className="app-header">

            <Link to="/home" className="app-logo">
                <img src="/favicon.png" alt="Mapa do Corre" />
            </Link>

            {showSearch && (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="O que você procura hoje?"
                        className="search-input"
                        onChange={onSearch}
                    />
                </div>
            )}

            <Link to={profileRoute} className="profile-link">
                <div className="app-avatar">
                    {inicial || <img src={userDefault} alt="Perfil" />}
                </div>
            </Link>

        </header>
    );
}

export default AppHeader;