import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    cadastrarNegocio,
    getCategorias
} from "../service/negocioService";

import { uploadImagem } from "../../../shared/services/uploadService";

import NegocioForm from "../components/NegocioForm";

import "../styles/CadastroNegocio.css";

function CadastroNegocio() {
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // ❌ 'tipo' removido do estado inicial
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        contato: "",
        foto: "",
        categoriaId: ""
    });

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        try {
            const response = await getCategorias();
            if (!response.ok)
                throw new Error();

            const dados = await response.json();
            setCategorias(dados.content ?? dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // ❌ 'formData.tipo' removido da validação de obrigatoriedade
        if (
            !formData.nome ||
            !formData.descricao ||
            !formData.contato ||
            !formData.categoriaId
        ) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setCarregando(true);
            let foto = "";

            if (arquivoImagem) {
                foto = await uploadImagem(arquivoImagem);
            }

            const response = await cadastrarNegocio(
                Number(localStorage.getItem("empresarioId")),
                {
                    nome: formData.nome,
                    descricao: formData.descricao,
                    contato: formData.contato,
                    foto,
                    categoriaId: Number(formData.categoriaId)
                }
            );

            if (!response.ok) {
                const mensagem = await response.text();
                throw new Error(
                    mensagem || "Erro ao cadastrar negócio."
                );
            }

            navigate("/dashboard");
        } catch (erro) {
            console.error(erro);
            setErrorMessage(erro.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="negocio-page">
            <section className="negocio-card">
                <Link
                    to="/dashboard"
                    className="btn-fechar"
                >
                    ←
                </Link>

                <div className="negocio-brand">
                    <img
                        src="/favicon.png"
                        alt="Mapa do Corre"
                    />
                </div>

                <h1 className="negocio-titulo">
                    Cadastrar negócio
                </h1>

                <p className="negocio-subtitulo">
                    Coloque seu corre no mapa!
                </p>

                <NegocioForm
                    formData={formData}
                    setFormData={setFormData}
                    categorias={categorias}
                    arquivoImagem={arquivoImagem}
                    setArquivoImagem={setArquivoImagem}
                    onSubmit={handleSubmit}
                    carregando={carregando}
                    errorMessage={errorMessage}
                    botaoTexto="Cadastrar negócio"
                />

                <button
                    className="btn-pular"
                    onClick={() => navigate("/dashboard")}
                >
                    Fazer isso depois
                </button>
            </section>
        </div>
    );
}

export default CadastroNegocio;