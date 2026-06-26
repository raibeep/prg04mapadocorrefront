import "../styles/BusinessCard.css";

function BusinessCard({ negocio }) {
    return (
        <article className="business-card">

            <img
                src={negocio.imagem}
                alt={negocio.nome}
                className="business-image"
            />

            <div className="business-content">

                <h3 className="business-name">
                    {negocio.nome}
                </h3>

                <span className="business-category">
                    {negocio.categoria}
                </span>

                <p className="business-address">
                    {negocio.endereco}
                </p>

            </div>

        </article>
    );
}

export default BusinessCard;