import { API_URL } from "../../../shared/services/api";

const URL = `${API_URL}/negocios`;

export async function cadastrarNegocio(empresarioId, negocio) {
    const token = localStorage.getItem("token");

    return fetch(`${API_URL}/empresarios/${empresarioId}/negocios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(negocio)
    });
}

export async function getCategorias() {
    return fetch(`${API_URL}/categorias/findall`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function getNegocio(id) {
    return fetch(`${URL}/findbyid/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function getNegocios() {
    return fetch(`${URL}/findall`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function updateNegocio(id, negocio) {
    return fetch(`${URL}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(negocio)
    });
}

export async function deleteNegocio(id) {
    return fetch(`${URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function getProdutosDoNegocio(id) {
    return fetch(`${API_URL}/produtos/negocio/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}