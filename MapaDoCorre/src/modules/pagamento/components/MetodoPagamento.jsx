import "../styles/MetodoPagamento.css";

function MetodoPagamento({
    metodoPagamento,
    setMetodoPagamento
}) {

    function handleChange(event) {
        setMetodoPagamento(event.target.value);
    }

    return (
        <div className="metodo-pagamento">

            <h2>Método de pagamento</h2>

            <label className="metodo-option">

                <input
                    type="radio"
                    name="metodoPagamento"
                    value="PIX"
                    checked={metodoPagamento === "PIX"}
                    onChange={handleChange}
                />

                <span>PIX</span>

            </label>

            <label className="metodo-option">

                <input
                    type="radio"
                    name="metodoPagamento"
                    value="CARTAO_CREDITO"
                    checked={metodoPagamento === "CARTAO_CREDITO"}
                    onChange={handleChange}
                />

                <span>Cartão de crédito</span>

            </label>

            <label className="metodo-option">

                <input
                    type="radio"
                    name="metodoPagamento"
                    value="CARTAO_DEBITO"
                    checked={metodoPagamento === "CARTAO_DEBITO"}
                    onChange={handleChange}
                />

                <span>Cartão de débito</span>

            </label>

            <label className="metodo-option">

                <input
                    type="radio"
                    name="metodoPagamento"
                    value="DINHEIRO"
                    checked={metodoPagamento === "DINHEIRO"}
                    onChange={handleChange}
                />

                <span>Dinheiro</span>

            </label>

        </div>
    );

}

export default MetodoPagamento;