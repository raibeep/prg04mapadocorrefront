import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../service/authService";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (!senha) {
            setErrorMessage("Informe sua senha.");
            return;
        }

        try {
            const response = await login(email, senha);

            if (response.ok) {
                const dados = await response.json();
                localStorage.setItem("token", dados.token);
                localStorage.setItem("userId", dados.id);
                localStorage.setItem("tipoPerfil", dados.perfil);
                localStorage.setItem("perfilId", dados.perfilId);
                localStorage.setItem("nomeUsuario", dados.nome);

                if (dados.perfil === "CLIENTE") {
                    localStorage.setItem("clienteId", dados.perfilId);
                    navigate("/home");
                } else if (dados.perfil === "EMPRESARIO") {
                    localStorage.setItem("empresarioId", dados.perfilId);
                    if (dados.temNegocio) {
                        navigate("/dashboard");
                    } else {
                        navigate("/cadastro-negocio");
                    }
                }
            } else if (response.status === 401) {
                setErrorMessage("Senha inválida.");
            } else {
                const mensagem = await response.text();
                setErrorMessage(mensagem);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className="login-page">

            <section className="login-card">

                <Link to="/auth" className="btn-fechar">
                    ←
                </Link>

                <div className="login-brand">
                    <img
                        src="/favicon.png"
                        alt="Logo Mapa do Corre"
                    />
                </div>

                <h1 className="login-titulo">
                    Bem-vindo de volta
                </h1>

                <p className="login-sub">
                    Entrando como
                </p>

                <p className="login-email">
                    {email}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-field">
                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input
                            type="password"
                            id="senha"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <Link
                        to="/recuperar-senha"
                        className="esqueceu-senha"
                    >
                        Esqueceu sua senha?
                    </Link>

                    {errorMessage && (
                        <p className="form-error">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn-entrar"
                    >
                        Entrar
                    </button>

                </form>

            </section>

        </div>
    );
}

export default Login;