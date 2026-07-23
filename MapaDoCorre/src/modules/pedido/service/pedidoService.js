import { API_URL } from "../../../shared/services/api";

export async function getMeusPedidos() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/pedidos/meus-pedidos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar pedidos.");
    }
    
    return await response.json();
}

export async function cancelarPedido(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/pedidos/cancelar/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao cancelar pedido.");
    }

    return await response.json();
}