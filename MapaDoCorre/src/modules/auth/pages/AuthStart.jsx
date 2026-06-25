import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verificarEmail } from "../service/authStart";
import "../styles/Auth-Start.css";


function AuthStart() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            const response = await verificarEmail(email);

            const existe = await response.json();

            if (existe) {

                navigate("/login", {
                    state: { email }
                });

            } else {

                navigate("/register", {
                    state: { email }
                });

            }

        } catch (error) {

            console.error(error);

        }
    }

    return (
        <div className="auth-page">
            <section className="auth-card">

                <Link to="/" className="btn-fechar">
                    ✕
                </Link>

                <div className="auth-brand">
                    <img
                        src="/favicon.png"
                        alt="Logo Mapa do Corre"
                    />
                </div>

                <h1 className="auth-titulo">
                    Entrar ou cadastrar-se
                </h1>

                <p className="auth-subtitulo">
                    Descubra empresas, serviços e oportunidades perto de você.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-continuar"
                        disabled={!email.trim()}
                    >
                        Continuar
                    </button>
                </form>

            </section>
        </div>
    );
}

export default AuthStart;