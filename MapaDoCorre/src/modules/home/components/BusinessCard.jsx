import "../styles/BusinessCard.css";

function BusinessCard({ negocio }) {
    return (
        <article className="business-card">

            <img
                src={negocio.foto}
                alt={negocio.nome}
                className="business-image"
            />

            <div className="business-content">

                <h3 className="business-name">
                    {negocio.nome}
                </h3>

                <span className="business-category">
                    {negocio.categoriaNome}
                </span>

                <p className="business-description">
                    {negocio.descricao
                        ? negocio.descricao.length > 90
                            ? `${negocio.descricao.substring(0, 90)}...`
                            : negocio.descricao
                        : "Sem descrição disponível."}
                </p>

            </div>

        </article>
    );
}

export default BusinessCard;