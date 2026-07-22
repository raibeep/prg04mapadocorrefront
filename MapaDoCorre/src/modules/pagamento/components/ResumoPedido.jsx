import { useCarrinho } from "../../../shared/context/CarrinhoContext";

import "../styles/ResumoPedido.css";

function ResumoPedido() {

    const {
        itens,
        total
    } = useCarrinho();

    return (

        <section className="resumo-pedido">

            <h2>Resumo do pedido</h2>

            {itens.map(item => (

                <div
                    key={item.id}
                    className="resumo-item"
                >

                    <img
                        src={item.foto}
                        alt={item.nome}
                    />

                    <div className="resumo-info">

                        <h4>{item.nome}</h4>

                        <span>
                            {item.quantidade} x R$ {Number(item.preco).toFixed(2)}
                        </span>

                    </div>

                    <strong>

                        R$ {(Number(item.preco) * item.quantidade).toFixed(2)}

                    </strong>

                </div>

            ))}

            <div className="resumo-total">

                <span>Total</span>

                <strong>

                    R$ {total.toFixed(2)}

                </strong>

            </div>

        </section>

    );

}

export default ResumoPedido;