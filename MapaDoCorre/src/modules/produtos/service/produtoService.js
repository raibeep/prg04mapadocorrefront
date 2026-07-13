import { API_URL } from "../../../shared/services/api";

const URL = `${API_URL}/produtos`;

export async function getProdutos() {
    return fetch(`${URL}/findall`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function getProduto(id) {
    return fetch(`${URL}/findbyid/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function createProduto(body) {
    return fetch(`${URL}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    });
}

export async function updateProduto(id, body) {
    return fetch(`${URL}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    });
}

export async function deleteProduto(id) {
    return fetch(`${URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

}

export async function getProdutosPorNegocio(negocioId) {
    return fetch(`${URL}/negocio/${negocioId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}