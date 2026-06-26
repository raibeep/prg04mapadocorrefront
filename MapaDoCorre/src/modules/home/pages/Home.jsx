import { useState, useEffect } from "react";
import AppHeader from "../../../shared/components/Header/AppHeader";
import BusinessCard from "../components/BusinessCard";
import { getNegocios } from "../service/homeService";
import "../styles/Home.css";

function Home() {
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function carregarNegocios() {
            try {
                const response = await getNegocios();

                if (response.ok) {
                    const dados = await response.json();

                    console.log(dados.content);

                    setNegocios(dados.content ?? dados);
                } else {
                    throw new Error("Não foi possível carregar os negócios.");
                }
            } catch (error) {
                console.error(error);
                setError("Erro ao carregar os negócios.");
            } finally {
                setLoading(false);
            }
        }

        carregarNegocios();
    }, []);

    if (loading) {
        return (
            <div className="home-loading">
                <div className="home-spinner"></div>
                <p>Carregando os corres...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <AppHeader showSearch />

            <main className="home-container">
                {negocios.length > 0 ? (
                    negocios.map((negocio) => (
                        <BusinessCard
                            key={negocio.id}
                            negocio={negocio}
                        />
                    ))
                ) : (
                    <p className="home-empty">
                        Ainda não existem negócios cadastrados.
                    </p>
                )}
            </main>
        </div>
    );
}

export default Home;