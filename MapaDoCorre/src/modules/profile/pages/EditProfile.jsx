import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import { uploadImagem } from "../../../shared/services/uploadService";
import {
    getPerfil,
    updatePerfil
} from "../service/userService";

import {
    getEmpresario,
    updateEmpresario
} from "../../empresario/service/empresarioService";

import "../styles/EditProfile.css";

function EditProfile() {

    const navigate = useNavigate();

    const perfil = localStorage.getItem("tipoPerfil");

    const inputImagem = useRef(null);

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [arquivoImagem, setArquivoImagem] = useState(null);

    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        bio: "",
        fotoPerfil: ""
    });

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        try {

            let response;

            if (perfil === "CLIENTE") {

                response = await getPerfil(
                    localStorage.getItem("clienteId")
                );

            } else {

                response = await getEmpresario(
                    localStorage.getItem("empresarioId")
                );

            }

            if (!response.ok)
                throw new Error("Erro ao carregar perfil.");

            const dados = await response.json();

            setFormData({
                nome: dados.nome || "",
                telefone: dados.telefone || "",
                bio: dados.bio || "",
                fotoPerfil: dados.fotoPerfil || ""
            });

        } catch (erro) {

            console.error(erro);
            setErrorMessage(erro.message);

        } finally {

            setLoading(false);

        }

    }

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));

    }

    function handleImagem(event) {

        const file = event.target.files[0];

        if (!file) return;

        setArquivoImagem(file);

        setFormData(current => ({
            ...current,
            fotoPerfil: URL.createObjectURL(file)
        }));
    }
    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            let fotoPerfil = formData.fotoPerfil;

            if (arquivoImagem) {
                fotoPerfil = await uploadImagem(arquivoImagem);
            }

            const body = {
                nome: formData.nome,
                telefone: formData.telefone,
                bio: formData.bio,
                fotoPerfil
            };

            let response;

            if (perfil === "CLIENTE") {
                response = await updatePerfil(
                    localStorage.getItem("clienteId"),
                    body
                );
            } else {
                response = await updateEmpresario(
                    localStorage.getItem("empresarioId"),
                    body
                );
            }

            if (!response.ok) {
                throw new Error("Erro ao salvar alterações.");
            }

            navigate(
                perfil === "CLIENTE"
                    ? "/tela-perfil"
                    : "/perfil-empresario"
            );

        } catch (erro) {
            console.error(erro);
            setErrorMessage(erro.message);
        }
    }

    if (loading) {

        return (
            <div className="edit-profile-loading">
                Carregando...
            </div>
        );

    }

    return (

        <div className="edit-profile-page">

            <AppHeader />

            <div className="edit-profile-container">

                <Link
                    to={
                        perfil === "CLIENTE"
                            ? "/tela-perfil"
                            : "/perfil-empresario"
                    }
                    className="edit-profile-back"
                >
                    ← Voltar
                </Link>

                <h1>Editar Perfil</h1>

                <form onSubmit={handleSubmit}>

                    <div className="edit-profile-photo">

                        <div
                            className="edit-profile-photo-wrapper"
                            onClick={() => inputImagem.current.click()}
                        >

                            {formData.fotoPerfil ? (

                                <img
                                    src={formData.fotoPerfil}
                                    alt="Foto de Perfil"
                                    className="edit-profile-image"
                                />

                            ) : (

                                <div className="edit-profile-avatar">

                                    {formData.nome
                                        ? formData.nome.charAt(0).toUpperCase()
                                        : "?"}

                                </div>

                            )}

                            <div className="edit-profile-overlay">
                                Alterar foto
                            </div>

                        </div>

                        <input
                            ref={inputImagem}
                            type="file"
                            accept="image/*"
                            onChange={handleImagem}
                            hidden
                        />

                    </div>

                    <div className="input-field">

                        <label>Nome</label>

                        <input
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-field">

                        <label>Telefone</label>

                        <input
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-field">

                        <label>Bio</label>

                        <textarea
                            rows="5"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Conte um pouco sobre você..."
                        />

                    </div>

                    {errorMessage && (
                        <p className="form-error">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="edit-profile-btn"
                    >
                        Salvar Alterações
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditProfile;