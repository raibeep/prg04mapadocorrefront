import ProdutoCard from "./ProdutoCard";
import "../styles/ProdutoGrid.css";

function ProdutoGrid({ produtos, onProdutoClick }) {

    if (!produtos.length) {

        return (
            <p className="sem-produtos">
                Este negócio ainda não possui produtos cadastrados.
            </p>
        );

    }

    return (

        <section className="produto-grid">

            {produtos.map(produto => (

                <ProdutoCard
                    key={produto.id}
                    produto={produto}
                    onProdutoClick={onProdutoClick}
                />

            ))}

        </section>

    );

}

export default ProdutoGrid;