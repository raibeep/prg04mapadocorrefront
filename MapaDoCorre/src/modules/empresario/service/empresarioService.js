import { API_URL } from "../../../shared/services/api";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// Buscar empresário
export async function getEmpresario(empresarioId) {
    return fetch(`${API_URL}/empresarios/findbyid/${empresarioId}`, {
        method: "GET",
        headers: getHeaders()
    });
}

// Atualizar empresário
export async function updateEmpresario(id, dados) {
    return fetch(`${API_URL}/empresarios/update/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(dados)
    });
}

// Buscar negócio do empresário
export async function getNegocioDoEmpresario(empresarioId) {
    return fetch(`${API_URL}/empresarios/${empresarioId}/negocios`, {
        method: "GET",
        headers: getHeaders()
    });
}