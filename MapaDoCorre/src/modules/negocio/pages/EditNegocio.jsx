import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NegocioForm from "../components/NegocioForm";

import {
    getNegocio,
    updateNegocio,
    getCategorias
} from "../service/negocioService";

import { uploadImagem } from "../../../shared/services/uploadService";

import "../styles/CadastroNegocio.css";

function EditNegocio() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [carregando, setCarregando] = useState(false);

    const [categorias, setCategorias] = useState([]);

    const [arquivoImagem, setArquivoImagem] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        contato: "",
        foto: "",
        tipo: "",
        categoriaId: null,
        categoriaNome: ""
    });

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        try {

            const [responseNegocio, responseCategorias] = await Promise.all([
                getNegocio(id),
                getCategorias()
            ]);

            if (!responseNegocio.ok)
                throw new Error("Erro ao carregar negócio.");

            const negocio = await responseNegocio.json();

            if (responseCategorias.ok) {

                const dadosCategorias = await responseCategorias.json();

                setCategorias(
                    dadosCategorias.content ?? dadosCategorias
                );

            }

            setFormData({
                nome: negocio.nome ?? "",
                descricao: negocio.descricao ?? "",
                contato: negocio.contato ?? "",
                foto: negocio.foto ?? "",
                tipo: negocio.tipo ?? "",
                categoriaId: negocio.categoriaId ?? null,
                categoriaNome: negocio.categoriaNome ?? ""
            });

        } catch (erro) {

            console.error(erro);
            setErrorMessage(erro.message);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setCarregando(true);

            let foto = formData.foto;

            if (arquivoImagem) {

                foto = await uploadImagem(arquivoImagem);

            }

            const body = {
                nome: formData.nome,
                descricao: formData.descricao,
                contato: formData.contato,
                foto,
                tipo: formData.tipo,
                categoriaId: formData.categoriaId
            };

            const response = await updateNegocio(id, body);

            if (!response.ok)
                throw new Error("Erro ao atualizar negócio.");

            navigate("/dashboard");

        } catch (erro) {

            console.error(erro);
            setErrorMessage(erro.message);

        } finally {

            setCarregando(false);

        }

    }

    if (loading) {

        return (

            <div className="negocio-page">

                <section className="negocio-card">

                    <h2>Carregando...</h2>

                </section>

            </div>

        );

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

                    Editar negócio

                </h1>

                <p className="negocio-subtitulo">

                    Atualize as informações do seu negócio.

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

                    botaoTexto="Salvar alterações"

                    bloquearCategoria={true}
                    bloquearTipo={true}

                />

            </section>

        </div>

    );

}

export default EditNegocio;