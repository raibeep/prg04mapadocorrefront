import { useState, useEffect, useMemo } from "react";
import AppHeader from "../../../shared/components/Header/AppHeader";
import CategoriaFiltro from "../components/CategoriaFiltro";
import SecaoNegocios from "../components/SecaoNegocios";
import BusinessCard from "../components/BusinessCard";
import { getNegocios } from "../service/homeService";
import "../styles/Home.css";

function Home() {
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        async function carregarNegocios() {
            try {
                const response = await getNegocios();

                if (response.ok) {
                    const dados = await response.json();
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

    const categorias = useMemo(() => {
        return [...new Set(negocios.map(n => n.categoriaNome).filter(Boolean))];
    }, [negocios]);

    const negociosPorCategoria = useMemo(() => {
        return categorias.map(categoria => ({
            categoria,
            itens: negocios.filter(n => n.categoriaNome === categoria)
        }));
    }, [categorias, negocios]);

    const negociosFiltrados = useMemo(() => {
        if (!categoriaSelecionada) return negocios;
        return negocios.filter(n => n.categoriaNome === categoriaSelecionada);
    }, [negocios, categoriaSelecionada]);

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

            <CategoriaFiltro
                categorias={categorias}
                categoriaSelecionada={categoriaSelecionada}
                onSelecionar={setCategoriaSelecionada}
            />

            <main className="home-container">

                {negocios.length === 0 && (
                    <p className="home-empty">
                        Ainda não existem negócios cadastrados.
                    </p>
                )}

                {categoriaSelecionada ? (

                    <div className="secao-negocios">
                        <div className="secao-negocios-scroll">
                            {negociosFiltrados.map(negocio => (
                                <BusinessCard key={negocio.id} negocio={negocio} />
                            ))}
                        </div>
                    </div>

                ) : (

                    negociosPorCategoria.map(({ categoria, itens }) => (
                        <SecaoNegocios
                            key={categoria}
                            negocios={itens}
                        />
                    ))

                )}


            </main>

        </div>
    );
}

export default Home;