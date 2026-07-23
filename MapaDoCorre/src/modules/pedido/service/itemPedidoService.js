import { API_URL } from "../../../shared/services/api";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function getItensPorNegocio(negocioId) {
    return fetch(`${API_URL}/itens-pedido/negocio/${negocioId}`, {
        method: "GET",
        headers: getHeaders()
    });
}

export async function confirmarItem(id) {
    return fetch(`${API_URL}/itens-pedido/${id}/confirmar`, {
        method: "PATCH",
        headers: getHeaders()
    });
}

export async function cancelarItem(id) {
    return fetch(`${API_URL}/itens-pedido/${id}/cancelar`, {
        method: "PATCH",
        headers: getHeaders()
    });
}