import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { register } from "../service/registerService";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        senha: "",
        confirmarSenha: ""
    });


    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await register({
            nome: formData.nome,
            cpf: formData.cpf,
            telefone: formData.telefone,
            email,
            senha: formData.senha
        });

        if (
            !formData.nome ||
            !formData.cpf ||
            !formData.telefone ||
            !formData.senha ||
            !formData.confirmarSenha
        ) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        try {
            navigate("/selecionar-perfil", {
                state: {
                    usuarioId: response.id
                }
            });
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao realizar cadastro.");
        }
    }

    return (
        <div className="register-page">

            <section className="register-card">

                <Link to="/auth" className="btn-fechar">
                    ←
                </Link>

                <div className="register-brand">
                    <img
                        src="/favicon.png"
                        alt="Logo Mapa do Corre"
                    />
                </div>

                <h1 className="register-titulo">
                    Criar conta
                </h1>

                <p className="register-subtitulo">
                    Complete seus dados para começar.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-field">
                        <label>E-mail</label>

                        <input
                            type="email"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className="input-field">
                        <label>Nome completo</label>

                        <input
                            type="text"
                            name="nome"
                            placeholder="Seu nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>CPF</label>

                        <input
                            type="text"
                            name="cpf"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Telefone</label>

                        <input
                            type="text"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Senha</label>

                        <input
                            type="password"
                            name="senha"
                            placeholder="••••••••"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Confirmar senha</label>

                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder="••••••••"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                        />
                    </div>

                    {errorMessage && (
                        <p className="form-error">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn-cadastrar"
                    >
                        Criar conta
                    </button>

                </form>

            </section>

        </div>
    );
}

export default Register;