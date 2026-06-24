import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import '../styles/Login.css'

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.senha) {
      setErrorMessage("Preencha todos os campos para continuar.");
      return;
    }
    
    try{
      const response = await login(
        formData.email,
        formData.senha
      );

      if(response.ok) {
          navigate("/feed");
      } else if(response.status === 401){
        setErrorMessage("Email ou senha inválidos");
      }else {
        const mensagem = await response.text();
        setErrorMensage(mensagem);
      }
    }catch(error){
      setErrorMessage("Erro ao conectar com o servidor");
    }

  }

  return (
    <div className="login-page">

      <section className="login-card">

        <Link to="/" className="btn-fechar">✕</Link>

        <div className="login-brand">
          <img src="/favicon.png" alt="Logo Mapa do Corre" />
          <span>Mapa<b> do Corre</b></span>
        </div>

        <h2>Bem-vindo de volta!</h2>
        <p className="login-sub">Insira seus dados para continuar.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>

          <div className="extra-options">
            <label>
              <input
                type="checkbox"
                name="lembrar"
                checked={formData.lembrar}
                onChange={handleChange}
              />
              Lembrar-me
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="btn-entrar">Entrar</button>
        </form>

        <p className="register-link">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </section>

      <div className="login-painel">
        <div className="painel-overlay" />
        <div className="painel-conteudo">
          <h3>O corre tá aqui.</h3>
          <p>Encontre negócios locais e apoie quem empreende todo dia.</p>
        </div>
      </div>

    </div>
  );
}

export default Login;
