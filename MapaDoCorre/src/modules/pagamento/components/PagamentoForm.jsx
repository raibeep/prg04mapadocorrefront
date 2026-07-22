import MetodoPagamento from "./MetodoPagamento";
import PixInfo from "./PixInfo";
import DinheiroForm from "./DinheiroForm";

import "../styles/PagamentoForm.css";

function PagamentoForm({

    metodoPagamento,
    setMetodoPagamento,

    troco,
    setTroco,

    semTroco,
    setSemTroco

}) {

    return (

        <section className="pagamento-form">

            <MetodoPagamento
                metodoPagamento={metodoPagamento}
                setMetodoPagamento={setMetodoPagamento}
            />

            {metodoPagamento === "PIX" && (

                <PixInfo />

            )}

            {metodoPagamento === "DINHEIRO" && (

                <DinheiroForm
                    troco={troco}
                    setTroco={setTroco}
                    semTroco={semTroco}
                    setSemTroco={setSemTroco}
                />

            )}

            {(metodoPagamento === "CARTAO_CREDITO" ||
                metodoPagamento === "CARTAO_DEBITO") && (

                    <div className="cartao-info">

                        <p>

                            O pagamento será realizado
                            diretamente no estabelecimento.

                        </p>

                    </div>

                )}

        </section>

    );

}

export default PagamentoForm;