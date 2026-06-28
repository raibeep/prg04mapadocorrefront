import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { getEmpresario } from "../service/empresarioService";
import { Star, BriefcaseBusiness, LayoutDashboard } from "lucide-react";
import "../styles/EmpresarioPage.css";

function EmpresarioPage() {
    const navigate = useNavigate();
    const [empresario, setEmpresario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarPerfil() {
            try {
                const empresarioId = localStorage.getItem("perfilId");

                if (!empresarioId) {
                    throw new Error("Usuário não identificado.");
                }

                const response = await getEmpresario(empresarioId);

                if (response.ok) {
                    const dados = await response.json();
                    setEmpresario(dados);
                } else {
                    throw new Error("Não foi possível carregar os dados do empresário.");
                }

            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        carregarPerfil();
    }, []);

    if (loading) {
        return (
            <div className="empresario-loading">
                <div className="empresario-spinner"></div>
                <p>Carregando seu corre...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="empresario-error">
                <p>{error}</p>
                <button onClick={() => window.location.href = "/auth"}>
                    Ir para Login
                </button>
            </div>
        );
    }

    const bioExibida =
        empresario?.bio ||
        "Conte um pouco sobre você e o seu negócio para conquistar mais clientes.";

    const fotoPerfil = empresario?.fotoPerfil;
    const inicial = empresario?.nome?.charAt(0).toUpperCase() || "?";

    return (
        <div className="empresario-page">
            <AppHeader />

            <div className="empresario-container">

                <div className="empresario-section-title">
                    <h2>Meu Perfil</h2>
                </div>

                <div className="empresario-layout">

                    <section className="empresario-card">

                        <div className="empresario-card-header"></div>

                        {fotoPerfil ? (
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                className="empresario-avatar"
                            />
                        ) : (
                            <div className="empresario-avatar-inicial">
                                {inicial}
                            </div>
                        )}

                        <div className="empresario-info">
                            <h1>{empresario?.nome}</h1>

                            <p className="empresario-email">
                                {empresario?.email}
                            </p>

                            <p className="empresario-role">
                                Empresário do Mapa do Corre
                            </p>
                        </div>

                        <button className="empresario-edit-btn"
                            onClick={() => navigate("/editar-perfil-empresario")}>
                            Editar perfil
                        </button>

                    </section>

                    <aside className="empresario-sidebar">

                        <div className="empresario-sidebar-card">

                            <h3>Sobre mim</h3>

                            <p className="empresario-bio">
                                {bioExibida}
                            </p>

                            {(!empresario?.bio || !empresario?.fotoPerfil) && (
                                <div className="empresario-sidebar-cta">

                                    <h3>Seu perfil pode ficar ainda melhor!</h3>

                                    <p>
                                        Adicione uma foto e uma bio para transmitir
                                        mais confiança aos seus clientes.
                                    </p>

                                    <button className="empresario-sidebar-cta-btn">
                                        Completar Agora
                                    </button>

                                </div>
                            )}

                        </div>

                        <div className="empresario-sidebar-links">

                            <a href="#" className="empresario-sidebar-link">
                                <Star size={24} />
                                Ver avaliações do negócio
                            </a>

                            <a href="#" className="empresario-sidebar-link">
                                <BriefcaseBusiness size={24} />
                                Meu negócio
                            </a>

                            <a href="#" className="empresario-sidebar-link">
                                <LayoutDashboard size={24} />
                                Painel do empresário
                            </a>

                        </div>

                    </aside>

                </div>

            </div>
        </div>
    );
}

export default EmpresarioPage;