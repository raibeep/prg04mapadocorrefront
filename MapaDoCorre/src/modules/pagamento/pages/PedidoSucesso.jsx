import { Link } from "react-router-dom";

import "../styles/PedidoSucesso.css";

function PedidoSucesso() {

    return (

        <main className="pedido-sucesso">

            <div className="pedido-card">

                <span className="pedido-icon">

                    ✅

                </span>

                <h1>

                    Pedido realizado!

                </h1>

                <p>

                    Seu pedido foi enviado ao estabelecimento.

                </p>

                <Link
                    to="/feed"
                    className="btn-voltar"
                >

                    Voltar ao início

                </Link>

            </div>

        </main>

    );

}

export default PedidoSucesso;