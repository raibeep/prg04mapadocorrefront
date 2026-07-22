import { Link } from "react-router-dom";

import "../styles/PedidoSucesso.css";

function PedidoSucesso() {

    return (

        <main className="pedido-sucesso">

            <div className="pedido-card">

                <div className="pedido-icon">
                    <svg viewBox="0 0 52 52">
                        <circle
                            className="pedido-circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                        />
                        <path
                            className="pedido-check"
                            fill="none"
                            d="M14 27 L22 35 L38 18"
                        />
                    </svg>
                </div>

                <h1>
                    Pedido realizado!
                </h1>

                <p>
                    Seu pedido foi enviado ao estabelecimento.
                </p>

                <Link
                    to="/home"
                    className="btn-voltar"
                >
                    Voltar ao início
                </Link>

            </div>

        </main>

    );

}

export default PedidoSucesso;