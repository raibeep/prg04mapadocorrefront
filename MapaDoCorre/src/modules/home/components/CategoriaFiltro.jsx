import "../styles/CategoriaFiltro.css";

const ICONES_CATEGORIA = {
    "Alimentação": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.06 3.06a2 2 0 0 0-2.83 0l-9.9 9.9a1 1 0 0 0-.27.46l-1 3.5a1 1 0 0 0 1.23 1.23l3.5-1a1 1 0 0 0 .46-.27l9.9-9.9a2 2 0 0 0 0-2.83l-1.09-1.09zM16.64 7.3a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 1.41-1.41l-.71-.71z"/>
        </svg>
     ),
    "Moda & Acessórios": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C9.24 2 7 4.24 7 7v2H5v2h2v9c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-9h2V9h-2V7c0-2.76-2.24-5-5-5zm-3 5c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V7zm6 13c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-9h7v9z"/>
        </svg>
     ),
    "Serviços": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
     ),
    "Beleza": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
     ),
    "Eventos": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
        </svg>
     ),
    "Todos": (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.09 6.26L20.18 9l-4.91 4.18L17.18 19 12 15.77 6.82 19l1.91-5.82L3.82 9l6.09-.74L12 2z"/>
        </svg>
     )
};

function CategoriaFiltro({ categorias, categoriaSelecionada, onSelecionar }) {
    return (
        <nav className="categoria-filtro">
            <button
                type="button"
                className={`categoria-chip ${!categoriaSelecionada ? "ativo" : ""}`}
                onClick={() => onSelecionar(null)}
            >
                <span className="categoria-icone">
                    {ICONES_CATEGORIA["Todos"]}
                </span>
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
                        {ICONES_CATEGORIA[categoria] ?? (
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
                            </svg>
                         )}
                    </span>
                    <span>{categoria}</span>
                </button>
            ))}
        </nav>
    );
}

export default CategoriaFiltro;
