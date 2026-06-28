import { API_URL } from "../../../shared/services/api";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function getPerfil(id) {
    return fetch(`${API_URL}/clientes/findbyid/${id}`, {
        method: "GET",
        headers: getHeaders()
    });
}

export async function updatePerfil(id, dados) {
    return fetch(`${API_URL}/clientes/update/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(dados)
    });
}