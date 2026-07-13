import { Link } from "react-router-dom";
import heroImagem from "../../../assets/images/hero.png"; // troque pelo nome da sua imagem
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">

      <img
        className="hero-bg"
        src={heroImagem}
        alt="Feira de rua com empreendedores locais"
      />

      <div className="hero-overlay"></div>

      <h1 className="hero-headline">
        Descubra o corre <br/><em>perto de você.</em>
      </h1>

      <div className="hero-bottom">
        <Link to="/auth" className="btn-hero">
          Explorar negócios →
        </Link>
      </div>

    </section>
  );
}

export default Hero;