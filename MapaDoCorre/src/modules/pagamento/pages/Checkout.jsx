import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppHeader from "../../../shared/components/Header/AppHeader";

import PagamentoForm from "../components/PagamentoForm";
import ResumoPedido from "../components/ResumoPedido";

import { useCarrinho } from "../../../shared/context/CarrinhoContext";

import { getEnderecosCliente, criarEndereco } from "../../profile/service/userService";
import { criarPedido } from "../service/pagamentoService";

import "../styles/Checkout.css";

const ENDERECO_VAZIO = {
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
};

function Checkout() {

    const navigate = useNavigate();

    const { itens, limparCarrinho } = useCarrinho();

    const [enderecos, setEnderecos] = useState([]);

    const [formData, setFormData] = useState({

        enderecoId: "",
        metodoPagamento: "PIX"

    });

    const [troco, setTroco] = useState("");

    const [semTroco, setSemTroco] = useState(true);

    const [carregando, setCarregando] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [mostrarNovoEndereco, setMostrarNovoEndereco] = useState(false);

    const [novoEndereco, setNovoEndereco] = useState(ENDERECO_VAZIO);

    const [salvandoEndereco, setSalvandoEndereco] = useState(false);

    const [erroEndereco, setErroEndereco] = useState("");

    useEffect(() => {

        carregarEnderecos();

    }, []);

    async function carregarEnderecos() {

        try {

            const response = await getEnderecosCliente(
                Number(localStorage.getItem("clienteId"))
            );

            if (!response.ok) {
                throw new Error();
            }

            const dados = await response.json();

            setEnderecos(dados.content ?? dados);

        } catch (erro) {

            console.error(erro);

        }

    }

    function handleEndereco(event) {

        setFormData(current => ({
            ...current,
            enderecoId: event.target.value
        }));

    }

    function handleNovoEnderecoChange(event) {

        const { name, value } = event.target;

        setNovoEndereco(current => ({
            ...current,
            [name]: value
        }));

    }

    function toggleNovoEndereco() {

        setMostrarNovoEndereco(current => !current);

        setErroEndereco("");

        setNovoEndereco(ENDERECO_VAZIO);

    }

    async function handleSalvarEndereco() {

        const camposObrigatorios = ["cep", "rua", "numero", "bairro", "cidade", "estado"];

        const faltando = camposObrigatorios.some(
            campo => !novoEndereco[campo]
        );

        if (faltando) {

            setErroEndereco("Preencha todos os campos obrigatórios.");

            return;

        }

        try {

            setSalvandoEndereco(true);

            setErroEndereco("");

            const response = await criarEndereco({
                ...novoEndereco,
                clienteId: Number(localStorage.getItem("clienteId"))
            });

            if (!response.ok) {

                const mensagem = await response.text();

                throw new Error(
                    mensagem || "Erro ao cadastrar endereço."
                );

            }

            const enderecoCriado = await response.json();

            await carregarEnderecos();

            setFormData(current => ({
                ...current,
                enderecoId: enderecoCriado.id
            }));

            setMostrarNovoEndereco(false);

            setNovoEndereco(ENDERECO_VAZIO);

        } catch (erro) {

            console.error(erro);

            setErroEndereco(erro.message);

        } finally {

            setSalvandoEndereco(false);

        }

    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (!formData.enderecoId) {

            setErrorMessage("Selecione um endereço.");

            return;

        }

        if (itens.length === 0) {

            setErrorMessage("Seu carrinho está vazio.");

            return;

        }

        try {

            setCarregando(true);

            const pedido = {

                enderecoId: Number(formData.enderecoId),

                metodoPagamento: formData.metodoPagamento,

                troco: (formData.metodoPagamento === "DINHEIRO" && !semTroco && troco)
                    ? Number(troco)
                    : null,

                itens: itens.map(item => ({

                    produtoId: item.id,

                    quantidade: item.quantidade

                }))

            };

            const response = await criarPedido(pedido);

            if (!response.ok) {

                const mensagem = await response.text();

                throw new Error(
                    mensagem || "Erro ao realizar pedido."
                );

            }

            limparCarrinho();

            navigate("/pedido/sucesso");

        } catch (erro) {

            console.error(erro);

            setErrorMessage(erro.message);

        } finally {

            setCarregando(false);

        }

    }

    return (

        <>
            <AppHeader />

            <main className="checkout-page">

                <form
                    className="checkout-container"
                    onSubmit={handleSubmit}
                >

                    <section className="checkout-esquerda">

                        <div className="checkout-card">

                            <h2>Endereço de entrega</h2>

                            <select
                                value={formData.enderecoId}
                                onChange={handleEndereco}
                            >

                                <option value="">
                                    Selecione...
                                </option>

                                {enderecos.map(endereco => (

                                    <option
                                        key={endereco.id}
                                        value={endereco.id}
                                    >

                                        {endereco.rua},
                                        {" "}
                                        {endereco.numero}
                                        {" - "}
                                        {endereco.bairro}

                                    </option>

                                ))}

                            </select>

                            <button
                                type="button"
                                className="link-novo-endereco"
                                onClick={toggleNovoEndereco}
                            >

                                {mostrarNovoEndereco
                                    ? "Cancelar"
                                    : "+ Cadastrar novo endereço"}

                            </button>

                            {mostrarNovoEndereco && (

                                <div className="novo-endereco-form">

                                    <div className="novo-endereco-linha">

                                        <div className="input-field">
                                            <label>CEP</label>
                                            <input
                                                name="cep"
                                                value={novoEndereco.cep}
                                                onChange={handleNovoEnderecoChange}
                                                placeholder="00000-000"
                                            />
                                        </div>

                                        <div className="input-field">
                                            <label>Estado</label>
                                            <input
                                                name="estado"
                                                value={novoEndereco.estado}
                                                onChange={handleNovoEnderecoChange}
                                                placeholder="BA"
                                                maxLength={2}
                                            />
                                        </div>

                                    </div>

                                    <div className="input-field">
                                        <label>Cidade</label>
                                        <input
                                            name="cidade"
                                            value={novoEndereco.cidade}
                                            onChange={handleNovoEnderecoChange}
                                            placeholder="Irecê"
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label>Rua</label>
                                        <input
                                            name="rua"
                                            value={novoEndereco.rua}
                                            onChange={handleNovoEnderecoChange}
                                        />
                                    </div>

                                    <div className="novo-endereco-linha">

                                        <div className="input-field">
                                            <label>Número</label>
                                            <input
                                                name="numero"
                                                value={novoEndereco.numero}
                                                onChange={handleNovoEnderecoChange}
                                            />
                                        </div>

                                        <div className="input-field">
                                            <label>Complemento</label>
                                            <input
                                                name="complemento"
                                                value={novoEndereco.complemento}
                                                onChange={handleNovoEnderecoChange}
                                                placeholder="Opcional"
                                            />
                                        </div>

                                    </div>

                                    <div className="input-field">
                                        <label>Bairro</label>
                                        <input
                                            name="bairro"
                                            value={novoEndereco.bairro}
                                            onChange={handleNovoEnderecoChange}
                                        />
                                    </div>

                                    {erroEndereco && (

                                        <p className="checkout-error">
                                            {erroEndereco}
                                        </p>

                                    )}

                                    <button
                                        type="button"
                                        className="btn-salvar-endereco"
                                        onClick={handleSalvarEndereco}
                                        disabled={salvandoEndereco}
                                    >

                                        {salvandoEndereco
                                            ? "Salvando..."
                                            : "Salvar endereço"}

                                    </button>

                                </div>

                            )}

                        </div>

                        <PagamentoForm

                            metodoPagamento={formData.metodoPagamento}

                            setMetodoPagamento={metodoPagamento =>
                                setFormData(current => ({
                                    ...current,
                                    metodoPagamento
                                }))
                            }

                            troco={troco}

                            setTroco={setTroco}

                            semTroco={semTroco}

                            setSemTroco={setSemTroco}

                        />

                    </section>

                    <section className="checkout-direita">

                        <ResumoPedido />

                        {errorMessage && (

                            <p className="checkout-error">

                                {errorMessage}

                            </p>

                        )}

                        <button
                            type="submit"
                            className="btn-finalizar"
                            disabled={carregando}
                        >

                            {carregando
                                ? "Finalizando..."
                                : "Finalizar pedido"}

                        </button>

                    </section>

                </form>

            </main>

        </>

    );

}

export default Checkout;