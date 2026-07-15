import { Link, useNavigate } from "react-router-dom";
import { LogOut, X, Star, Package, Store } from "lucide-react";
import "./SidebarMenu.css";

function SidebarMenu({ aberto, onClose, tipoPerfil, nome, fotoPerfil, rotaPerfil }) {

    const navigate = useNavigate();
    const negocioId = localStorage.getItem("negocioId");

    const linksEmpresario = [
        { label: "Avaliações", icon: Star, route: "/avaliacoes" },
        { label: "Pedidos", icon: Package, route: "/pedidos" },
        { label: "Minha loja", icon: Store, route: negocioId ? `/minha-loja/${negocioId}` : "/minha-loja" }
    ];

    const linksCliente = [
        // vá adicionando aqui conforme criar novas telas do cliente
    ];

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("tipoPerfil");
        localStorage.removeItem("userId");
        localStorage.removeItem("perfilId");
        localStorage.removeItem("nomeUsuario");
        localStorage.removeItem("negocioId");
        onClose();
        navigate("/auth", { replace: true });
    }

    const links = tipoPerfil === "EMPRESARIO" ? linksEmpresario : linksCliente;
    const inicial = nome?.charAt(0).toUpperCase() || "?";

    return (
        <>
            <div
                className={`sidebar-overlay ${aberto ? "aberto" : ""}`}
                onClick={onClose}
            />

            <aside className={`sidebar-menu ${aberto ? "aberto" : ""}`}>

                <div className="sidebar-header">

                    <button
                        type="button"
                        className="sidebar-fechar"
                        onClick={onClose}
                        aria-label="Fechar menu"
                    >
                        <X size={20} />
                    </button>

                </div>

                <Link
                    to={rotaPerfil}
                    className="sidebar-perfil"
                    onClick={onClose}
                >

                    {fotoPerfil ? (

                        <img src={fotoPerfil} alt="Foto de perfil" className="sidebar-avatar-img" />

                    ) : (

                        <div className="sidebar-avatar">{inicial}</div>

                    )}

                    <div>
                        <strong>{nome || "Meu perfil"}</strong>
                        <span>Ver perfil</span>
                    </div>

                </Link>

                <nav className="sidebar-links">

                    {links.map(({ label, icon: Icon, route }) => (

                        <Link
                            key={route}
                            to={route}
                            className="sidebar-link"
                            onClick={onClose}
                        >
                            <Icon size={20} />
                            <span>{label}</span>
                        </Link>

                    ))}

                </nav>

                <button
                    type="button"
                    className="sidebar-link sidebar-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>

            </aside>
        </>
    );

}

export default SidebarMenu;