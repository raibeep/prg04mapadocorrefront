import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {

    const [itens, setItens] = useState(() => {

        const salvo = localStorage.getItem("carrinho");
        return salvo ? JSON.parse(salvo) : [];

    });

    const [aberto, setAberto] = useState(false);

    useEffect(() => {

        localStorage.setItem("carrinho", JSON.stringify(itens));

    }, [itens]);

    function adicionarItem(produto) {

        setItens(prev => {

            const existente = prev.find(item => item.id === produto.id);

            if (existente) {

                return prev.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );

            }

            return [...prev, { ...produto, quantidade: 1 }];

        });

        setAberto(true);

    }

    function removerItem(produtoId) {

        setItens(prev => prev.filter(item => item.id !== produtoId));

    }

    function alterarQuantidade(produtoId, quantidade) {

        if (quantidade < 1) {
            removerItem(produtoId);
            return;
        }

        setItens(prev => prev.map(item =>
            item.id === produtoId ? { ...item, quantidade } : item
        ));

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
        (soma, item) => soma + Number(item.preco) * item.quantidade,
        0
    );

    const quantidadeTotal = itens.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    return (
        <CarrinhoContext.Provider value={{
            itens,
            aberto,
            total,
            quantidadeTotal,
            adicionarItem,
            removerItem,
            alterarQuantidade,
            limparCarrinho,
            abrirCarrinho,
            fecharCarrinho
        }}>
            {children}
        </CarrinhoContext.Provider>
    );

}

export function useCarrinho() {

    const contexto = useContext(CarrinhoContext);

    if (!contexto) {
        throw new Error("useCarrinho precisa estar dentro de um CarrinhoProvider");
    }

    return contexto;

}