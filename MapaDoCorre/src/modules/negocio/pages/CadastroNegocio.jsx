import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrarNegocio, getCategorias } from "../service/negocioService";
import { uploadImagem } from "../../../shared/services/uploadService";
import "../styles/CadastroNegocio.css";

function CadastroNegocio() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [imagemPreview, setImagemPreview] = useState(null);
    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        contato: "",
        tipo: "",
        categoriaId: ""
    });

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const response = await getCategorias();
                if (response.ok) {
                    const dados = await response.json();
                    setCategorias(dados.content ?? dados);
                }
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }
        carregarCategorias();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleImagem(event) {
        const arquivo = event.target.files[0];
        if (!arquivo) return;
        setArquivoImagem(arquivo);
        setImagemPreview(URL.createObjectURL(arquivo));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.nome || !formData.descricao || !formData.contato || !formData.tipo || !formData.categoriaId) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setCarregando(true);
            const empresarioId = localStorage.getItem("empresarioId");
            
            let fotoUrl = "";

            
            if (arquivoImagem) {
                fotoUrl = await uploadImagem(arquivoImagem);
            }

            const response = await cadastrarNegocio(empresarioId, {
                nome: formData.nome,
                descricao: formData.descricao,
                contato: formData.contato,
                foto: fotoUrl,
                tipo: formData.tipo,
                categoriaId: Number(formData.categoriaId)
            });

            if (response.ok) {
                navigate("/dashboard");
            } else {
                const mensagem = await response.text();
                setErrorMessage(mensagem || "Erro ao cadastrar negócio.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="negocio-page">
            <section className="negocio-card">
                <Link to="/dashboard" className="btn-fechar">←</Link>

                <div className="negocio-brand">
                    <img src="/favicon.png" alt="Logo Mapa do Corre" />
                </div>

                <h1 className="negocio-titulo">Cadastrar negócio</h1>
                <p className="negocio-subtitulo">Coloca seu corre no mapa!</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Nome do negócio</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Ex: Barraca da Dona Maria"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Descrição</label>
                        <textarea
                            name="descricao"
                            placeholder="Fala um pouco sobre o seu negócio..."
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Contato (WhatsApp ou Instagram)</label>
                        <input
                            type="text"
                            name="contato"
                            placeholder="(00) 00000-0000"
                            value={formData.contato}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Foto do negócio</label>
                        <div className="upload-area" onClick={() => document.getElementById("inputFoto").click()}>
                            {imagemPreview
                                ? <img src={imagemPreview} alt="Preview" className="upload-preview" />
                                : <span className="upload-placeholder">📷 Clique para adicionar uma foto</span>
                            }
                        </div>
                        <input
                            id="inputFoto"
                            type="file"
                            accept="image/*"
                            onChange={handleImagem}
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-field">
                            <label>Tipo</label>
                            <select name="tipo" value={formData.tipo} onChange={handleChange}>
                                <option value="">Selecione...</option>
                                <option value="ESTABELECIMENTO">Estabelecimento</option>
                                <option value="EVENTO">Evento</option>
                                <option value="SERVICO">Serviço</option>
                                <option value="PRODUTO">Produto</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label>Categoria</label>
                            <select name="categoriaId" value={formData.categoriaId} onChange={handleChange}>
                                <option value="">Selecione...</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.icone} {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {errorMessage && <p className="form-error">{errorMessage}</p>}

                    <button type="submit" className="btn-cadastrar" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Cadastrar negócio"}
                    </button>

                    <button
                        type="button"
                        className="btn-pular"
                        onClick={() => navigate("/dashboard")}
                    >
                        Fazer isso depois
                    </button>
                </form>
            </section>
        </div>
    );
}

export default CadastroNegocio;