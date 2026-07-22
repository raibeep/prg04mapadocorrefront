import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {

    const clienteId = localStorage.getItem("clienteId");
    const chaveCarrinho = clienteId
        ? `carrinho_${clienteId}`
        : "carrinho_visitante";

    const [itens, setItens] = useState([]);
    const [aberto, setAberto] = useState(false);

    // Carrega o carrinho do usuário sempre que o cliente mudar
    useEffect(() => {

        const salvo = localStorage.getItem(chaveCarrinho);

        if (salvo) {
            setItens(JSON.parse(salvo));
        } else {
            setItens([]);
        }

    }, [chaveCarrinho]);

    // Salva o carrinho do usuário atual
    useEffect(() => {

        localStorage.setItem(chaveCarrinho, JSON.stringify(itens));

    }, [itens, chaveCarrinho]);

    function adicionarItem(produto) {

        setItens(prev => {

            const existente = prev.find(item => item.id === produto.id);

            if (existente) {

                return prev.map(item =>
                    item.id === produto.id
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1
                        }
                        : item
                );

            }

            return [
                ...prev,
                {
                    ...produto,
                    quantidade: 1
                }
            ];

        });

        setAberto(true);

    }

    function removerItem(produtoId) {

        setItens(prev =>
            prev.filter(item => item.id !== produtoId)
        );

    }

    function alterarQuantidade(produtoId, quantidade) {

        if (quantidade < 1) {
            removerItem(produtoId);
            return;
        }

        setItens(prev =>
            prev.map(item =>
                item.id === produtoId
                    ? {
                        ...item,
                        quantidade
                    }
                    : item
            )
        );

    }

    function limparCarrinho() {

        setItens([]);

    }

    function abrirCarrinho() {

        setAberto(true);

    }

    function fecharCarrinho() {

        setAberto(false);

    }

    const total = itens.reduce(
        (soma, item) =>
            soma + Number(item.preco) * item.quantidade,
        0
    );

    const quantidadeTotal = itens.reduce(
        (soma, item) =>
            soma + item.quantidade,
        0
    );

    function gerarPedido(enderecoId, metodoPagamento) {

        return {
            enderecoId,
            metodoPagamento,
            itens: itens.map(item => ({
                produtoId: item.id,
                quantidade: item.quantidade
            }))
        };

    }

    return (
        <CarrinhoContext.Provider
            value={{
                itens,
                aberto,
                total,
                quantidadeTotal,
                adicionarItem,
                removerItem,
                alterarQuantidade,
                limparCarrinho,
                abrirCarrinho,
                fecharCarrinho,
                gerarPedido
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );

}

export function useCarrinho() {

    const contexto = useContext(CarrinhoContext);

    if (!contexto) {
        throw new Error(
            "useCarrinho precisa estar dentro de um CarrinhoProvider"
        );
    }

    return contexto;

}