import "../styles/PixInfo.css";

function PixInfo() {

    return (

        <div className="pix-info">

            <h3>Pagamento via PIX</h3>

            <p>
                Após confirmar o pedido será exibido o QR Code
                e a chave PIX para pagamento.
            </p>

            <small>
                O pedido será confirmado após a aprovação do pagamento.
            </small>

        </div>

    );

}

export default PixInfo;