import "../styles/CategoriaFiltro.css";

const ICONES_CATEGORIA = {
    "Alimentação": "🍕",
    "Moda & Acessórios": "👕",
    "Serviços": "🛠️",
    "Beleza": "💄",
    "Eventos": "🎉"
};

function CategoriaFiltro({ categorias, categoriaSelecionada, onSelecionar }) {

    return (
        <nav className="categoria-filtro">

            <button
                type="button"
                className={`categoria-chip ${!categoriaSelecionada ? "ativo" : ""}`}
                onClick={() => onSelecionar(null)}
            >
                <span className="categoria-icone">✨</span>
                <span>Todos</span>
            </button>

            {categorias.map(categoria => (

                <button
                    key={categoria}
                    type="button"
                    className={`categoria-chip ${categoriaSelecionada === categoria ? "ativo" : ""}`}
                    onClick={() => onSelecionar(categoria)}
                >
                    <span className="categoria-icone">
                        {ICONES_CATEGORIA[categoria] ?? "🏷️"}
                    </span>
                    <span>{categoria}</span>
                </button>

            ))}

        </nav>
    );

}

export default CategoriaFiltro;