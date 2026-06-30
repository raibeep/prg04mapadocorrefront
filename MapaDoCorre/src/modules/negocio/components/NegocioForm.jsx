import { useRef } from "react";

function NegocioForm({
    formData,
    setFormData,
    categorias = [],
    arquivoImagem,
    setArquivoImagem,
    onSubmit,
    carregando = false,
    errorMessage = "",
    botaoTexto = "Salvar",
    mostrarCategoria = true,
    bloquearCategoria = false,
    bloquearTipo = false
}) {

    const inputImagem = useRef(null);

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

        const preview = URL.createObjectURL(file);

        setFormData((current) => ({
            ...current,
            foto: preview
        }));

    }

    return (

        <form onSubmit={onSubmit}>

            <div className="input-field">

                <label>Nome do negócio</label>

                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome do negócio"
                />

            </div>

            <div className="input-field">

                <label>Descrição</label>

                <textarea
                    rows="5"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre seu negócio..."
                />

            </div>

            <div className="input-field">

                <label>Contato</label>

                <input
                    type="text"
                    name="contato"
                    value={formData.contato}
                    onChange={handleChange}
                    placeholder="Whatsapp ou Instagram"
                />

            </div>

            <div className="input-field">

                <label>Foto do negócio</label>

                <div
                    className="upload-area"
                    onClick={() => inputImagem.current.click()}
                >

                    {formData.foto ? (

                        <img
                            src={formData.foto}
                            alt="Preview"
                            className="upload-preview"
                        />

                    ) : (

                        <span className="upload-placeholder">
                            📷 Clique para adicionar uma foto
                        </span>

                    )}

                </div>

                <input
                    hidden
                    ref={inputImagem}
                    type="file"
                    accept="image/*"
                    onChange={handleImagem}
                />

            </div>

            <div className="input-row">

                <div className="input-field">

                    <label>Tipo</label>

                    {bloquearTipo ? (

                        <input
                            type="text"
                            value={formData.tipo}
                            disabled
                        />

                    ) : (

                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="ESTABELECIMENTO">Estabelecimento</option>
                            <option value="EVENTO">Evento</option>
                            <option value="SERVICO">Serviço</option>
                            <option value="PRODUTO">Produto</option>
                        </select>

                    )}

                </div>

                <div className="input-field">

                    <label>Categoria</label>

                    {bloquearCategoria ? (

                        <input
                            type="text"
                            value={formData.categoriaNome}
                            disabled
                        />

                    ) : (

                        <select
                            name="categoriaId"
                            value={formData.categoriaId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione...</option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.icone} {categoria.nome}
                                </option>

                            ))}

                        </select>

                    )}

                </div>

            </div>

            {errorMessage && (

                <p className="form-error">
                    {errorMessage}
                </p>

            )}

            <button
                type="submit"
                className="btn-cadastrar"
                disabled={carregando}
            >

                {carregando
                    ? "Salvando..."
                    : botaoTexto}

            </button>

        </form>

    );

}

export default NegocioForm;