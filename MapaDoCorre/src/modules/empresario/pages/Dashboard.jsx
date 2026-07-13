import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { getEmpresario, getNegocioDoEmpresario } from "../service/empresarioService";
import { Star, Package, User, MapPinned, Pencil, Camera, Phone, Store } from "lucide-react";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [empresario, setEmpresario] = useState(null);
    const [negocio, setNegocio] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const empresarioId = localStorage.getItem("perfilId");

                const resEmpresario = await getEmpresario(empresarioId);
                if (resEmpresario.ok) {
                    const dados = await resEmpresario.json();
                    setEmpresario(dados);
                }

                const resNegocio = await getNegocioDoEmpresario(empresarioId);
                if (resNegocio.ok && resNegocio.status !== 204) {
                    const dados = await resNegocio.json();
                    setNegocio(dados);
                }
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, []);

    if (carregando) return (
        <div className="dash-loading">
            <div className="dash-spinner"></div>
            <p>Carregando seu corre...</p>
        </div>
    );

    const primeiroNome = empresario?.nome?.split(" ")[0] ?? "Empresário";
    const avatarFallback = primeiroNome.charAt(0).toUpperCase();

    return (
        <div className="dash-page">

            <AppHeader profileRoute="/perfil-empresario" />

            <main className="dash-main">

                {/* SAUDAÇÃO */}
                <div className="dash-saudacao">
                    <h1>Olá, {primeiroNome}! 👋</h1>
                    <p>Bem-vindo ao seu painel de controle.</p>
                </div>

                {/* BANNER SE NÃO TEM NEGÓCIO */}
                {!negocio && (
                    <div className="dash-banner">
                        <div className="dash-banner-texto">
                            <h2>Seu corre ainda não tá no mapa!</h2>
                            <p>Cadastre seu negócio e comece a aparecer para os clientes da sua região.</p>
                            <button
                                className="dash-banner-btn"
                                onClick={() => navigate("/cadastro-negocio")}
                            >
                                Cadastrar agora
                            </button>
                        </div>
                        <MapPinned size={80} strokeWidth={1.5} />
                    </div>
                )}

                {/* CARD DO NEGÓCIO */}
                {negocio && (
                    <div className="dash-negocio">
                        <div className="dash-negocio-header">
                            <h2>Meu negócio</h2>
                            <button
                                className="dash-editar-btn"
                                onClick={() => navigate(`/editar-negocio/${negocio.id}`)}
                            >
                                <Pencil size={16} />
                                <span> Editar</span>
                            </button>
                        </div>

                        <div className="dash-negocio-card">
                            <div className="dash-negocio-foto">
                                {negocio.foto
                                    ? <img src={negocio.foto} alt={negocio.nome} />
                                    : <div className="dash-negocio-foto-placeholder"><Camera size={16} /></div>
                                }
                            </div>
                            <div className="dash-negocio-info">
                                <h3>{negocio.nome}</h3>
                                <span className="dash-negocio-tipo">{negocio.tipo}</span>
                                <span className="dash-negocio-categoria">{negocio.categoriaNome}</span>
                                <p className="dash-negocio-descricao">{negocio.descricao}</p>
                                <p className="dash-negocio-contato"><Phone size={16} /> {negocio.contato}</p>
                            </div>
                        </div>

                        {/* ATALHOS */}
                        <div className="dash-atalhos">
                            <div className="dash-atalho" onClick={() => navigate("/avaliacoes")}>
                                <Star size={24} />
                                <span>Avaliações</span>
                            </div>
                            <div className="dash-atalho" onClick={() => navigate("/pedidos")}>
                                <Package size={24} />
                                <span>Pedidos</span>
                            </div>
                            <div className="dash-atalho" onClick={() => navigate("/perfil-empresario")}>
                                <User size={24} />
                                <span>Meu Perfil</span>
                            </div>
                            <div className="dash-atalho" onClick={() => navigate(`/minha-loja/${negocio.id}`)}>
                                <Store size={24}/>
                                <span>Minha Loja</span>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Dashboard;