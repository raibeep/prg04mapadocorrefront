import { API_URL } from "../../../shared/services/api";

export async function cadastrarNegocio(empresarioId, negocio) {
    const token = localStorage.getItem("token");

    return await fetch(`${API_URL}/empresarios/${empresarioId}/negocios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(negocio)
    });
}

export async function getCategorias() {
    const token = localStorage.getItem("token");

    return await fetch(`${API_URL}/categorias/findall`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function getNegocio(id) {
    const token = localStorage.getItem("token");

    return fetch(`${API_URL}/negocios/findbyid/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function updateNegocio(id, negocio) {
    const token = localStorage.getItem("token");

    return fetch(`${API_URL}/negocios/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(negocio)
    });
}