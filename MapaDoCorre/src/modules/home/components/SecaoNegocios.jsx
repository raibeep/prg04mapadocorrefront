import BusinessCard from "./BusinessCard";
import "../styles/SecaoNegocios.css";

function SecaoNegocios({ titulo, negocios }) {

    if (!negocios.length) return null;

    return (
        <section className="secao-negocios">

            <h2>{titulo}</h2>

            <div className="secao-negocios-scroll">

                {negocios.map(negocio => (
                    <BusinessCard key={negocio.id} negocio={negocio} />
                ))}

            </div>

        </section>
    );

}

export default SecaoNegocios;