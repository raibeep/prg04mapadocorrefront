import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userDefault from "../../../assets/images/user.png";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { getPerfil } from "../service/userService";
import "../styles/Profile.css";

function ProfilePage() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarPerfil = async () => {
            try {
                setLoading(true);
                const userId = localStorage.getItem("perfilId");
                if (!userId || userId === "null" || userId === "undefined") {
                    throw new Error("Usuário não identificado. Por favor, faça login.");
                }
                const response = await getPerfil(userId);
                if (response.ok) {
                    const dados = await response.json();
                    setUsuario(dados);
                } else {
                    throw new Error("Não foi possível carregar os dados do perfil.");
                }
            } catch (err) {
                console.error("Erro ao carregar perfil:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        carregarPerfil();
    }, []);

    if (loading) return (
        <div className="client-profile-loading">
            <div className="client-spinner"></div>
            <p>Carregando seu corre...</p>
        </div>
    );

    if (error) return (
        <div className="client-profile-error">
            <p>{error}</p>
            <button onClick={() => window.location.href = '/auth'}>Ir para Login</button>
        </div>
    );

    const bioExibida = usuario?.bio || "Olá! Ainda não escrevi nada sobre mim no Mapa do Corre.";
    const fotoPerfil = usuario?.fotoPerfil;
    const inicial = usuario?.nome?.charAt(0).toUpperCase() || "?";

    return (
        <div className="client-profile-page">
            <AppHeader />
            <div className="client-profile-container">
                <div className="client-profile-section-title">
                    <h2>Meu Perfil</h2>
                </div>

                <div className="client-profile-layout">
                    <section className="client-profile-card">
                        <div className="client-profile-card-header"></div>
                        {fotoPerfil
                            ? <img src={fotoPerfil} alt="Foto de perfil" className="client-profile-avatar" />
                            : <div className="client-profile-avatar-inicial">{inicial}</div>
                        }
                        <div className="client-profile-info">
                            <h1>{usuario?.nome}</h1>
                            <p className="client-profile-email">{usuario?.email}</p>
                            <p className="client-profile-role">Cliente do Mapa</p>
                        </div>
                        <button
                            className="client-edit-btn"
                            onClick={() => navigate("/editar-perfil")}>
                            Editar perfil
                        </button>
                    </section>

                    <aside className="client-profile-sidebar">
                        <div className="client-sidebar-card">
                            <h3>Sobre mim</h3>
                            <p className="client-profile-bio">{bioExibida}</p>
                            {(!usuario?.bio || !usuario?.fotoPerfil) && (
                                <div className="client-sidebar-cta">
                                    <h3>Seu perfil está incompleto!</h3>
                                    <p>Adicione uma foto e uma bio para que a comunidade te conheça melhor.</p>
                                    <button className="client-sidebar-cta-btn" onClick={() => navigate("/editar-perfil")}>
                                        Completar Agora
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;