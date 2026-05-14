import '../styles/Login.css'

function Login() {
  return (
    <div className="wrapper">
      <header className="apresentacao">
        <img src="./favicon.png" alt="Logo da empresa" className="logo" />
        <h1>Bem-vindo de volta</h1>
        <h2>Conecte-se com empreendedores do mundo todo</h2>
      </header>

      <main className="container">
        <form>
          <h1>Login</h1>

          <div className="input-box">
            <input
              placeholder="Usuário"
              type="email"
              name="email"
              className="input-user"
              required
              autoComplete="email"
            />
          </div>

          <div className="input-box">
            <input
              placeholder="Senha"
              type="password"
              className="input-password"
              required
              minLength={8}
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Lembrar senha
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit" className="login">Login</button>

          <div className="register-link">
            <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login
