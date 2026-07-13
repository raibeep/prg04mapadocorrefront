import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerfil } from "../../../modules/profile/service/userService";
import { getEmpresario } from "../../../modules/empresario/service/empresarioService";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import "./AppHeader.css";

function AppHeader({
    showSearch = false,
    onSearch,
    profileRoute,
    showCart = true
}) {
    const navigate = useNavigate();

    const tipoPerfil = localStorage.getItem("tipoPerfil");

    const [nome, setNome] = useState(localStorage.getItem("nomeUsuario") || "");
    const [fotoPerfil, setFotoPerfil] = useState("");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("tipoPerfil");
        localStorage.removeItem("userId");
        localStorage.removeItem("perfilId");
        localStorage.removeItem("nomeUsuario");
        navigate("/auth", { replace: true });
    }

    useEffect(() => {
        async function carregarUsuario() {

            try {

                let response;

                if (tipoPerfil === "CLIENTE") {

                    response = await getPerfil(localStorage.getItem("userId"));

                } else if (tipoPerfil === "EMPRESARIO") {

                    response = await getEmpresario(localStorage.getItem("perfilId"));

                } else {
                    return;
                }

                if (!response.ok) return;

                const dados = await response.json();

                setNome(dados.nome ?? "");
                setFotoPerfil(dados.fotoPerfil ?? "");

            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }

        }

        carregarUsuario();
    }, [tipoPerfil]);

    const inicial = nome?.charAt(0).toUpperCase() || "?";

    const rotaPerfil =
        profileRoute ||
        (tipoPerfil === "EMPRESARIO"
            ? "/perfil-empresario"
            : "/tela-perfil");

    return (
        <header className="app-header">

            <Link to={tipoPerfil === "EMPRESARIO" ? "/dashboard" : "/home"} className="app-logo">
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

            <div className="header-actions">

                {showCart && tipoPerfil === "CLIENTE" && (
                    <Link to="/carrinho" className="btn-cart">
                        <FiShoppingCart size={20} />
                    </Link>
                )}

                <Link to={rotaPerfil} className="profile-link">

                    {fotoPerfil ? (

                        <img
                            src={fotoPerfil}
                            alt="Foto de Perfil"
                            className="app-avatar-img"
                        />

                    ) : (

                        <div className="app-avatar">
                            {inicial}
                        </div>

                    )}

                </Link>

                <button className="btn-logout" onClick={handleLogout}>
                    <FiLogOut size={20} />
                </button>

            </div>

        </header>
    );
}

export default AppHeader;