import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppHeader from "../../../shared/components/Header/AppHeader";
import { getNegocio, getProdutosDoNegocio } from "../service/negocioService";

import ProdutoGrid from "../../produtos/components/ProdutoGrid";
import ProdutoModal from "../../produtos/components/ProdutoModal";


import "../styles/DetalhesNegocio.css";

function DetalhesNegocio() {

    const { id } = useParams();

    const [negocio, setNegocio] = useState(null);
    const [produtos, setProdutos] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarNegocio();
        carregarProdutos();
    }, []);

    async function carregarNegocio() {

        try {

            const response = await getNegocio(id);

            if (!response.ok) {
                throw new Error("Erro ao carregar negócio.");
            }

            const dados = await response.json();

            setNegocio(dados);

        } catch (erro) {

            console.error(erro);

        }

    }

    async function carregarProdutos() {

        try {

            const response = await getProdutosDoNegocio(id);

            if (!response.ok) {
                throw new Error("Erro ao carregar produtos.");
            }

            const dados = await response.json();

            setProdutos(dados.content ?? dados);

        } catch (erro) {

            console.error(erro);

        }

    }

    function abrirProduto(produto) {

        setProdutoSelecionado(produto);
        setModalAberto(true);

    }

    function fecharModal() {

        setModalAberto(false);
        setProdutoSelecionado(null);

    }

    if (!negocio) {
        return <p>Carregando...</p>;
    }

    return (

        <div className="detalhes-page">

            <AppHeader />

            <header className="negocio-header">

                <img
                    src={negocio.foto}
                    alt={negocio.nome}
                    className="negocio-header-image"
                />

            </header>

            <div className="negocio-info">

                <h1>{negocio.nome}</h1>

                <p className="negocio-descricao">{negocio.descricao}</p>

                <div className="negocio-infos">

                    <span className="info-pill">{negocio.categoriaNome}</span>

                    <span className="info-pill">
                        {negocio.quantidadePedidos ?? 0} pessoas já compraram aqui
                    </span>

                </div>

            </div>

            <main className="produtos-section">

                <h2>Produtos</h2>

                <ProdutoGrid
                    produtos={produtos}
                    onProdutoClick={abrirProduto}
                />

            </main>

            <ProdutoModal
                aberto={modalAberto}
                produto={produtoSelecionado}
                onClose={fecharModal}
            />

        </div>

    );

}

export default DetalhesNegocio;