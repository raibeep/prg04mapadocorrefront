import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { getMeusPedidos } from "../service/pedidoService";
import "../styles/MeusPedidos.css";

function MeusPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPedidos();
    }, []);

    async function carregarPedidos() {
        try {
            const dados = await getMeusPedidos();
            setPedidos(dados);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    function formatarData(data) {
        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    function formatarValor(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    if (loading) {
        return (
            <>
                <AppHeader />
                <div className="meus-pedidos-container">
                    <h2>Carregando pedidos...</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <AppHeader />

            <div className="meus-pedidos-container">

                <div className="titulo-area">
                    <h1>Meus Pedidos</h1>
                    <p>Acompanhe todas as suas compras.</p>
                </div>

                {pedidos.length === 0 ? (
                    <div className="pedido-vazio">
                        <h3>Você ainda não realizou nenhum pedido.</h3>

                        <Link to="/negocios" className="btn-explorar">
                            Explorar lojas
                        </Link>
                    </div>
                ) : (

                    pedidos.map((pedido) => (

                        <div className="pedido-card" key={pedido.id}>

                            <div className="pedido-topo">

                                <div>
                                    <h2>Pedido #{pedido.id}</h2>
                                    <span>
                                        {formatarData(pedido.criadoEm)}
                                    </span>
                                </div>

                                <span className={`status ${pedido.status.toLowerCase()}`}>
                                    {pedido.status}
                                </span>

                            </div>

                            <div className="pedido-info">

                                <div>
                                    <strong>Total</strong>
                                    <p>{formatarValor(pedido.valorTotal)}</p>
                                </div>

                                <div>
                                    <strong>Pagamento</strong>
                                    <p>{pedido.metodoPagamento.replace("_", " ")}</p>
                                </div>

                                <div>
                                    <strong>Entrega</strong>
                                    <p>{pedido.cidadeEntrega}</p>
                                </div>

                            </div>

                            <div className="pedido-itens">

                                <h3>Itens do pedido</h3>

                                {pedido.itens.map((item) => (

                                    <div className="item-pedido" key={item.id}>

                                        <img
                                            src={item.fotoProduto}
                                            alt={item.nomeProduto}
                                            className="item-pedido-foto"
                                        />

                                        <span className="item-pedido-nome">{item.nomeProduto}</span>

                                        <span className="item-pedido-qtd">
                                            {item.quantidade}x
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))

                )}

            </div>
        </>
    );
}

export default MeusPedidos;