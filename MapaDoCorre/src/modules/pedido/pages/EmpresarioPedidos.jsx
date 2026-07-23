import { useEffect, useState } from "react";

import AppHeader from "../../../shared/components/Header/AppHeader";

import { getNegocioDoEmpresario } from "../../empresario/service/empresarioService";
import {
    getItensPorNegocio,
    confirmarItem,
    cancelarItem
} from "../service/itemPedidoService";

import "../styles/EmpresarioPedidos.css";

function agruparPorPedido(itens) {

    const grupos = new Map();

    itens.forEach(item => {

        const itemNormalizado = {
            ...item,
            status: item.status ?? "PENDENTE"
        };

        if (!grupos.has(itemNormalizado.pedidoId)) {

            grupos.set(itemNormalizado.pedidoId, {
                pedidoId: itemNormalizado.pedidoId,
                clienteNome: itemNormalizado.clienteNome,
                enderecoResumo: itemNormalizado.enderecoResumo,
                criadoEm: itemNormalizado.criadoEm,
                itens: []
            });

        }

        grupos.get(itemNormalizado.pedidoId).itens.push(itemNormalizado);

    });

    return Array.from(grupos.values()).sort(
        (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)
    );

}

function EmpresarioPedidos() {

    const [pedidos, setPedidos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [processando, setProcessando] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        carregarPedidos();

    }, []);

    async function carregarPedidos() {

        try {

            setLoading(true);

            const empresarioId = Number(localStorage.getItem("empresarioId"));

            const responseNegocio = await getNegocioDoEmpresario(empresarioId);

            if (!responseNegocio.ok) {
                throw new Error();
            }

            const dadosNegocio = await responseNegocio.json();

            const negocios = dadosNegocio.content ?? dadosNegocio;

            const negocio = Array.isArray(negocios) ? negocios[0] : negocios;

            if (!negocio || !negocio.id) {
                throw new Error();
            }

            const response = await getItensPorNegocio(negocio.id);

            if (!response.ok) {
                throw new Error();
            }

            const itens = await response.json();

            setPedidos(agruparPorPedido(itens));

        } catch (erro) {

            console.error(erro);

            setErrorMessage("Erro ao carregar pedidos.");

        } finally {

            setLoading(false);

        }

    }

    function atualizarItemLocal(itemId, novoStatus) {

        setPedidos(current =>

            current.map(pedido => ({
                ...pedido,
                itens: pedido.itens.map(item =>
                    item.id === itemId
                        ? { ...item, status: novoStatus }
                        : item
                )
            }))

        );

    }

    async function handleConfirmar(itemId) {

        try {

            setProcessando(itemId);

            const response = await confirmarItem(itemId);

            if (!response.ok) {
                throw new Error();
            }

            atualizarItemLocal(itemId, "CONFIRMADO");

        } catch (erro) {

            console.error(erro);

            setErrorMessage("Erro ao confirmar item.");

        } finally {

            setProcessando(null);

        }

    }

    async function handleCancelar(itemId) {

        try {

            setProcessando(itemId);

            const response = await cancelarItem(itemId);

            if (!response.ok) {
                throw new Error();
            }

            atualizarItemLocal(itemId, "CANCELADO");

        } catch (erro) {

            console.error(erro);

            setErrorMessage("Erro ao cancelar item.");

        } finally {

            setProcessando(null);

        }

    }

    function formatarData(data) {

        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    function formatarValor(valor) {

        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }

    if (loading) {
        return (
            <>
                <AppHeader />
                <div className="empresario-pedidos-container">
                    <h2>Carregando pedidos...</h2>
                </div>
            </>
        );
    }

    return (

        <>
            <AppHeader />

            <div className="empresario-pedidos-container">

                <div className="titulo-area">
                    <h1>Pedidos</h1>
                    <p>Aprove ou recuse os pedidos do seu negócio.</p>
                </div>

                {errorMessage && (
                    <p className="empresario-pedidos-erro">
                        {errorMessage}
                    </p>
                )}

                {pedidos.length === 0 ? (

                    <div className="pedido-vazio">
                        <h3>Nenhum pedido por aqui ainda.</h3>
                    </div>

                ) : (

                    pedidos.map(pedido => (

                        <div className="pedido-card" key={pedido.pedidoId}>

                            <div className="pedido-topo">

                                <div>
                                    <h2>Pedido #{pedido.pedidoId}</h2>
                                    <span>{formatarData(pedido.criadoEm)}</span>
                                </div>

                                <div className="pedido-cliente">
                                    <strong>{pedido.clienteNome}</strong>
                                    <span>{pedido.enderecoResumo}</span>
                                </div>

                            </div>

                            <div className="pedido-itens">

                                {pedido.itens.map(item => (

                                    <div className="item-linha" key={item.id}>

                                        <img
                                            src={item.fotoProduto}
                                            alt={item.nomeProduto}
                                            className="item-linha-foto"
                                        />

                                        <div className="item-linha-info">
                                            <span className="item-linha-nome">
                                                {item.nomeProduto}
                                            </span>
                                            <span className="item-linha-detalhe">
                                                {item.quantidade}x {formatarValor(item.precoUnitario)}
                                            </span>
                                        </div>

                                        {item.status === "PENDENTE" ? (

                                            <div className="item-linha-acoes">

                                                <button
                                                    className="btn-confirmar"
                                                    disabled={processando === item.id}
                                                    onClick={() => handleConfirmar(item.id)}
                                                >
                                                    {processando === item.id ? "..." : "Aprovar"}
                                                </button>

                                                <button
                                                    className="btn-recusar"
                                                    disabled={processando === item.id}
                                                    onClick={() => handleCancelar(item.id)}
                                                >
                                                    Recusar
                                                </button>

                                            </div>

                                        ) : (

                                            <span className={`item-status ${item.status.toLowerCase()}`}>
                                                {item.status === "CONFIRMADO" ? "Aprovado" : "Recusado"}
                                            </span>

                                        )}

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

export default EmpresarioPedidos;