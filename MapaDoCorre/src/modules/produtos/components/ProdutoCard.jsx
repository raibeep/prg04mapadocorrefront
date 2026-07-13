import { Pencil, Trash2 } from "lucide-react";
import "../styles/ProdutoCard.css";

function ProdutoCard({
    produto,
    modo = "cliente",
    onProdutoClick,
    onEditar,
    onExcluir
}) {

    const gerenciavel = modo === "gerenciar";

    function handleClick() {

        if (!gerenciavel) {
            onProdutoClick(produto);
        }

    }

    return (
        <article
            className="produto-card"
            onClick={handleClick}
        >

            <img
                src={produto.foto}
                alt={produto.nome}
                className="produto-card-image"
            />

            <div className="produto-card-content">

                <h3>{produto.nome}</h3>

                <p>{produto.descricao}</p>

                <div className="produto-card-footer">

                    <strong>R$ {Number(produto.preco).toFixed(2)}</strong>

                    {gerenciavel ? (

                        <div className="produto-card-acoes">

                            <button
                                type="button"
                                className="btn-icon"
                                onClick={e => { e.stopPropagation(); onEditar(produto); }}
                                aria-label="Editar produto"
                            >
                                <Pencil size={16} />
                            </button>

                            <button
                                type="button"
                                className="btn-icon btn-icon-danger"
                                onClick={e => { e.stopPropagation(); onExcluir(produto); }}
                                aria-label="Excluir produto"
                            >
                                <Trash2 size={16} />
                            </button>

                        </div>

                    ) : (

                        <button onClick={e => { e.stopPropagation(); onProdutoClick(produto); }}>
                            Adicionar
                        </button>

                    )}

                </div>

            </div>

        </article>
    );

}

export default ProdutoCard;