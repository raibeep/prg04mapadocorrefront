import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteImg from "../../../assets/images/cliente.png";
import empresarioImg from "../../../assets/images/empresa.png";
import "../styles/SelectProfile.css";

function SelectProfile() {

    const navigate = useNavigate();

    const [perfil, setPerfil] = useState("");

    function handleSubmit() {

        if (!perfil) return;

        if (perfil === "CLIENTE") {
            navigate("/feed");
        }

        if (perfil === "EMPRESARIO") {
            navigate("/feed");
        }
    }

    return (
        <div className="profile-page">

            <section className="profile-card">

                <div className="profile-brand">
                    <img
                        src="/favicon.png"
                        alt="Logo"
                    />
                </div>

                <h1 className="profile-title">
                    Como deseja utilizar o Mapa do Corre?
                </h1>

                <p className="profile-subtitle">
                    Escolha o perfil que melhor representa você.
                </p>

                <div className="profile-options">

                    <button
                        type="button"
                        className={`option-card ${
                            perfil === "CLIENTE" ? "selected" : ""
                        }`}
                        onClick={() => setPerfil("CLIENTE")}
                    >
                        <img
                            src={clienteImg}
                            alt="Cliente"
                        />

                        <h3>Cliente</h3>

                        <span>
                            Procurar negócios e serviços.
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`option-card ${
                            perfil === "EMPRESARIO" ? "selected" : ""
                        }`}
                        onClick={() => setPerfil("EMPRESARIO")}
                    >
                        <img
                            src={empresarioImg}
                            alt="Empresário"
                        />

                        <h3>Empresário</h3>

                        <span>
                            Divulgar seu negócio.
                        </span>
                    </button>

                </div>

                <button
                    className="btn-continuar"
                    disabled={!perfil}
                    onClick={handleSubmit}
                >
                    Continuar
                </button>

            </section>

        </div>
    );
}

export default SelectProfile;