import { useEffect, useState } from "react";
import { createProduto, updateProduto } from "../service/produtoService";
import { uploadImagem } from "../../../shared/services/uploadService";
import "../styles/ProdutoModal.css";
import "../styles/ProdutoFormModal.css";

const TIPOS = ["ESTABELECIMENTO", "EVENTO", "SERVICO", "PRODUTO"];

function ProdutoFormModal({ aberto, produto, negocioId, onClose, onSalvo }) {

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        preco: "",
        foto: "",
        tipo: "PRODUTO"
    });

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    const editando = Boolean(produto);

    const [arquivoImagem, setArquivoImagem] = useState(null);

    useEffect(() => {

        if (produto) {

            setForm({
                nome: produto.nome ?? "",
                descricao: produto.descricao ?? "",
                preco: produto.preco ?? "",
                foto: produto.foto ?? "",
                tipo: produto.tipo ?? "PRODUTO"
            });

        } else {

            setForm({
                nome: "",
                descricao: "",
                preco: "",
                foto: "",
                tipo: "PRODUTO"
            });

        }

        setArquivoImagem(null);
        setErro("");

    }, [produto, aberto]);

    if (!aberto) return null;

    function handleChange(campo, valor) {

        setForm(prev => ({ ...prev, [campo]: valor }));

    }

    function handleImagem(event) {

        const file = event.target.files[0];

        if (!file) return;

        setArquivoImagem(file);

    }

    async function handleSubmit(e) {

        e.preventDefault();
        setSalvando(true);
        setErro("");

        try {

            let foto = form.foto;

            if (arquivoImagem) {
                foto = await uploadImagem(arquivoImagem);
            }

            const dto = {
                nome: form.nome,
                descricao: form.descricao,
                preco: Number(form.preco),
                foto,
                tipo: form.tipo,
                negocioId
            };

            const response = editando
                ? await updateProduto(produto.id, dto)
                : await createProduto(dto);

            if (!response.ok) {
                throw new Error("Erro ao salvar produto.");
            }

            onSalvo();
            onClose();

        } catch (error) {

            console.error(error);
            setErro("Não foi possível salvar o produto. Tente novamente.");

        } finally {

            setSalvando(false);

        }

    }

    return (

        <div className="produto-modal-overlay">

            <div className="produto-modal produto-form-modal">

                <button
                    className="produto-modal-close"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <h2>{editando ? "Editar produto" : "Novo produto"}</h2>

                <form onSubmit={handleSubmit} className="produto-form">

                    <label>
                        Nome
                        <input
                            type="text"
                            value={form.nome}
                            onChange={e => handleChange("nome", e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Descrição
                        <textarea
                            value={form.descricao}
                            onChange={e => handleChange("descricao", e.target.value)}
                            rows={3}
                            required
                        />
                    </label>

                    <label>
                        Preço (R$)
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.preco}
                            onChange={e => handleChange("preco", e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Tipo
                        <select
                            value={form.tipo}
                            onChange={e => handleChange("tipo", e.target.value)}
                        >
                            {TIPOS.map(tipo => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Foto do produto

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagem}
                        />

                    </label>

                    {erro && <p className="produto-form-erro">{erro}</p>}

                    <button type="submit" disabled={salvando}>
                        {salvando
                            ? "Salvando..."
                            : editando
                                ? "Salvar alterações"
                                : "Cadastrar produto"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ProdutoFormModal;