import "../styles/ProdutoModal.css";

function ProdutoModal({ produto, aberto, onClose }) {

    if (!aberto || !produto) return null;

    return (

        <div className="produto-modal-overlay">

            <div className="produto-modal">

                <button
                    className="produto-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <img
                    src={produto.foto}
                    alt={produto.nome}
                />

                <h2>{produto.nome}</h2>

                <p>{produto.descricao}</p>

                <strong>
                    R$ {Number(produto.preco).toFixed(2)}
                </strong>

                <button>
                    Adicionar ao carrinho
                </button>

            </div>

        </div>

    );

}

export default ProdutoModal;