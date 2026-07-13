import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { getNegocioDoEmpresario } from "../../empresario/service/empresarioService";
import { getProdutosPorNegocio, deleteProduto } from "../../produtos/service/produtoService";
import { getNegocio } from "../../negocio/service/negocioService";
import ProdutoCard from "../../produtos/components/ProdutoCard";
import ProdutoFormModal from "../../produtos/components/ProdutoFormModal";
import ConfirmModal from "../../produtos/components/ConfirmModal";
import "../styles/MinhaLoja.css";

function MinhaLoja() {
    const [negocio, setNegocio] = useState(null);
    const [produtos, setProdutos] = useState([]);

    const [formAberto, setFormAberto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);

    const [produtoExcluindo, setProdutoExcluindo] = useState(null);
    const [excluindo, setExcluindo] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        carregarNegocioEProdutos();
    }, []);

    async function carregarNegocioEProdutos() {

        try {

            const empresarioId = localStorage.getItem("perfilId");

            const resNegocio = await getNegocio(id);

            if (!resNegocio.ok) throw new Error("Erro ao carregar negócio.");

            const dadosNegocio = await resNegocio.json();

            setNegocio(dadosNegocio);

            const resProdutos = await getProdutosPorNegocio(id);

            if (!resProdutos.ok) throw new Error("Erro ao carregar produtos.");

            setProdutos(await resProdutos.json());

        } catch (error) {

            console.error(error);

        }

    }

    function abrirCadastro() {

        setProdutoEditando(null);
        setFormAberto(true);

    }

    function abrirEdicao(produto) {

        setProdutoEditando(produto);
        setFormAberto(true);

    }

    function fecharForm() {

        setFormAberto(false);
        setProdutoEditando(null);

    }

    function pedirExclusao(produto) {

        setProdutoExcluindo(produto);

    }

    async function confirmarExclusao() {

        setExcluindo(true);

        try {

            const response = await deleteProduto(produtoExcluindo.id);

            if (!response.ok) throw new Error("Erro ao excluir produto.");

            setProdutos(prev => prev.filter(p => p.id !== produtoExcluindo.id));
            setProdutoExcluindo(null);

        } catch (error) {

            console.error(error);

        } finally {

            setExcluindo(false);

        }

    }

    if (!negocio) {
        return <p>Carregando...</p>;
    }

    return (

        <div className="minha-loja-page">

            <AppHeader showCart={false} />

            <header className="loja-header">

                <img
                    src={negocio.foto}
                    alt={negocio.nome}
                    className="loja-header-image"
                />

            </header>

            <div className="loja-info">

                <div className="loja-info-topo">

                    <div>
                        <h1>{negocio.nome}</h1>
                        <span className="loja-categoria">{negocio.categoriaNome}</span>
                    </div>

                </div>

                <p className="loja-descricao">{negocio.descricao}</p>

            </div>

            <main className="loja-produtos">

                <div className="produtos-header">
                    <h2>Meus produtos</h2>

                    <button
                        type="button"
                        className="btn-cadastrar-produto"
                        onClick={abrirCadastro}
                    >
                        + Cadastrar produto
                    </button>
                </div>

                {produtos.length === 0 ? (

                    <p className="sem-produtos">
                        Você ainda não cadastrou produtos. Clique em "Cadastrar produto" para começar.
                    </p>

                ) : (

                    <section className="produto-grid">

                        {produtos.map(produto => (

                            <ProdutoCard
                                key={produto.id}
                                produto={produto}
                                modo="gerenciar"
                                onEditar={abrirEdicao}
                                onExcluir={pedirExclusao}
                            />

                        ))}

                    </section>

                )}

            </main>

            <ProdutoFormModal
                aberto={formAberto}
                produto={produtoEditando}
                negocioId={negocio.id}
                onClose={fecharForm}
                onSalvo={carregarNegocioEProdutos}
            />

            <ConfirmModal
                aberto={Boolean(produtoExcluindo)}
                titulo="Excluir produto"
                mensagem={`Tem certeza que deseja excluir "${produtoExcluindo?.nome}"? Essa ação não pode ser desfeita.`}
                onConfirmar={confirmarExclusao}
                onCancelar={() => setProdutoExcluindo(null)}
                confirmando={excluindo}
            />

        </div>

    );

}

export default MinhaLoja;