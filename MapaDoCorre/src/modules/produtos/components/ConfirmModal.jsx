import "../styles/ConfirmModal.css";

function ConfirmModal({ aberto, titulo, mensagem, onConfirmar, onCancelar, confirmando }) {

    if (!aberto) return null;

    return (

        <div className="confirm-modal-overlay">

            <div className="confirm-modal">

                <h3>{titulo}</h3>

                <p>{mensagem}</p>

                <div className="confirm-modal-acoes">

                    <button
                        type="button"
                        className="btn-secundario"
                        onClick={onCancelar}
                        disabled={confirmando}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="btn-perigo"
                        onClick={onConfirmar}
                        disabled={confirmando}
                    >
                        {confirmando ? "Excluindo..." : "Excluir"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;