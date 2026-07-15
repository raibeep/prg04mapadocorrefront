import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCarrinho } from "../../../shared/context/CarrinhoContext";
import "../styles/CarrinhoDrawer.css";

function CarrinhoDrawer() {

    const navigate = useNavigate();
    const tipoPerfil = localStorage.getItem("tipoPerfil");

    const {
        itens,
        aberto,
        total,
        fecharCarrinho,
        alterarQuantidade,
        removerItem
    } = useCarrinho();

    if (tipoPerfil !== "CLIENTE") return null;

    function irParaPagamento() {

        fecharCarrinho();
        navigate("/checkout");

    }

    return (
        <>
            <div
                className={`carrinho-overlay ${aberto ? "aberto" : ""}`}
                onClick={fecharCarrinho}
            />

            <aside className={`carrinho-drawer ${aberto ? "aberto" : ""}`}>

                <div className="carrinho-header">
                    <h2>Seu carrinho</h2>
                    <button
                        type="button"
                        className="carrinho-fechar"
                        onClick={fecharCarrinho}
                        aria-label="Fechar carrinho"
                    >
                        <X size={20} />
                    </button>
                </div>

                {itens.length === 0 ? (

                    <div className="carrinho-vazio">
                        <ShoppingBag size={48} strokeWidth={1.5} />
                        <p>Seu carrinho está vazio.</p>
                    </div>

                ) : (

                    <>
                        <div className="carrinho-itens">

                            {itens.map(item => (

                                <div key={item.id} className="carrinho-item">

                                    <img src={item.foto} alt={item.nome} />

                                    <div className="carrinho-item-info">

                                        <h4>{item.nome}</h4>
                                        <span className="carrinho-item-preco">
                                            R$ {Number(item.preco).toFixed(2)}
                                        </span>

                                        <div className="carrinho-item-qtd">

                                            <button
                                                type="button"
                                                onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                                                aria-label="Diminuir quantidade"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span>{item.quantidade}</span>

                                            <button
                                                type="button"
                                                onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                                                aria-label="Aumentar quantidade"
                                            >
                                                <Plus size={14} />
                                            </button>

                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="carrinho-item-remover"
                                        onClick={() => removerItem(item.id)}
                                        aria-label="Remover item"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>

                            ))}

                        </div>

                        <div className="carrinho-footer">

                            <div className="carrinho-total">
                                <span>Total</span>
                                <strong>R$ {total.toFixed(2)}</strong>
                            </div>

                            <button
                                type="button"
                                className="btn-pagamento"
                                onClick={irParaPagamento}
                            >
                                Seguir para o pagamento
                            </button>

                        </div>
                    </>

                )}

            </aside>
        </>
    );

}

export default CarrinhoDrawer;