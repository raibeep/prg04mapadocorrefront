import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerfil } from "../../../modules/profile/service/userService";
import { getEmpresario } from "../../../modules/empresario/service/empresarioService";
import { FiLogOut, FiShoppingCart, FiMenu } from "react-icons/fi";
import { useCarrinho } from "../../context/CarrinhoContext";
import SidebarMenu from "./SidebarMenu";
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
    const [menuAberto, setMenuAberto] = useState(false);

    const { quantidadeTotal, abrirCarrinho } = useCarrinho();

    useEffect(() => {
        async function carregarUsuario() {

            try {

                let response;

                if (tipoPerfil === "CLIENTE") {
                    response = await getPerfil(localStorage.getItem("perfilId"));

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
        <>

            <header className="app-header">

                <div className="header-esquerda">

                    <button
                        type="button"
                        className="btn-menu"
                        onClick={() => setMenuAberto(true)}
                        aria-label="Abrir menu"
                    >
                        <FiMenu size={22} />
                    </button>

                    <Link to={tipoPerfil === "EMPRESARIO" ? "/dashboard" : "/home"} className="app-logo">
                        <img src="/favicon.png" alt="Mapa do Corre" />
                    </Link>

                </div>

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
                        <button type="button" className="btn-cart" onClick={abrirCarrinho}>
                            <FiShoppingCart size={20} />
                            {quantidadeTotal > 0 && (
                                <span className="carrinho-badge">{quantidadeTotal}</span>
                            )}
                        </button>
                    )}

                </div>

            </header>

            <SidebarMenu
                aberto={menuAberto}
                onClose={() => setMenuAberto(false)}
                tipoPerfil={tipoPerfil}
                nome={nome}
                fotoPerfil={fotoPerfil}
                rotaPerfil={rotaPerfil}
            />

        </>
    );
}

export default AppHeader;