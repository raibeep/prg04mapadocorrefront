import '../styles/Admin.css'

const usuarios = [
  { id: 1, nome: 'Anna Gabriela da Silva', email: 'ana@gmail.com', status: 'Ativo' },
  { id: 2, nome: 'Eduardo Carvalho', email: 'du123@gmail.com', status: 'Inativo' },
  { id: 3, nome: 'Carol Campos', email: 'rolcampos@gmail.com', status: 'Ativo' },
  { id: 4, nome: 'Gabriela Silva Pinto', email: 'gabizinha@gmail.com', status: 'Ativo' },
  { id: 5, nome: 'Gustavo Guanaes', email: 'gustavoo@gmail.com', status: 'Inativo' },
]

const IconEditar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconExcluir = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
)

function Admin() {
  return (
    <div className="wrapper">
      <div className='admin-header'>
        <div className="header-titulo">
          <div className="logo-area">
            <img src="./favicon.png" alt="Logo" />
            <div className="textos">
              <h1 className="titulo">Mapa do Corre</h1>
              <p className="subtitulo">Painel Administrativo</p>
            </div>
          </div>
        </div>
        <div className="top-bar">
          <input type="text" className="pesquisa" placeholder="Pesquisar usuário..." />
          <button className="btn-adicionar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar
          </button>
        </div>
      </div>

      <main>
        <div className="container">
          <table>
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge ${usuario.status === 'Ativo' ? 'bg-success' : 'bg-danger'}`}>
                      {usuario.status}
                    </span>
                  </td>
                  <td>
                    <div className="acoes">
                      <button className="btn editar">
                        <IconEditar /> Editar
                      </button>
                      <button className="btn excluir">
                        <IconExcluir /> Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Admin