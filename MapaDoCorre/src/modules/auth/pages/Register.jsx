import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    useEffect(() => {
        if (!location.state?.email) {
            navigate("/auth", { replace: true });
        }
    }, [location.state, navigate]);

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        senha: "",
        confirmarSenha: ""
    });


    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));

        setErrors((current) => ({
            ...current,
            [name]: ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const cpfLimpo = formData.cpf.replace(/\D/g, "");

        const telefoneLimpo = formData.telefone.replace(/\D/g, "");

        const newErrors = {};

        if (!formData.cpf.trim()) {
            newErrors.cpf = "Preencha o CPF.";
        } else if (cpfLimpo.length !== 11) {
            newErrors.cpf = "O CPF deve conter 11 dígitos.";
        }

        if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            newErrors.telefone = "Informe um telefone válido.";
        }

        if (!formData.nome.trim()) {
            newErrors.nome = "Preencha o nome.";
        }

        if (!formData.telefone.trim()) {
            newErrors.telefone = "Preencha o telefone.";
        } else if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            newErrors.telefone = "Informe um telefone válido.";
        }

        if (!formData.senha) {
            newErrors.senha = "Preencha a senha.";
        }

        if (!formData.confirmarSenha) {
            newErrors.confirmarSenha = "Confirme a senha.";
        }


        if (formData.senha !== formData.confirmarSenha) {
            setErrors({
                confirmarSenha: "As senhas não coincidem."
            });
            setErrorMessage("");
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            if (
                !formData.nome ||
                !formData.cpf ||
                !formData.telefone ||
                !formData.senha ||
                !formData.confirmarSenha
            ) {
                setErrorMessage("Preencha todos os campos.");
            } else {
                setErrorMessage("");
            }

            return;
        }

        setErrors({});
        setErrorMessage("");

        navigate("/selecionar-perfil", {
            state: {
                nome: formData.nome,
                cpf: formData.cpf,
                telefone: formData.telefone,
                email,
                senha: formData.senha
            }
        });
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

                        {errors.email && (<p className="field-error">{errors.email}</p>)}
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

                        {errors.nome && (<p className="field-error">{errors.nome}</p>)}
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

                        {errors.cpf && (<p className="field-error">{errors.cpf}</p>)}
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

                        {errors.telefone && (<p className="field-error">{errors.telefone}</p>)}
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

                        {errors.senha && (<p className="field-error">{errors.senha}</p>)}
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

                        {errors.confirmarSenha && (<p className="field-error">{errors.confirmarSenha}</p>)}
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