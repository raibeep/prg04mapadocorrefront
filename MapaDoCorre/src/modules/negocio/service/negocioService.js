import { API_URL } from "../../../shared/services/api";

export async function uploadImagem(arquivo) {
    const apiKey = "af3bdd857345f9631b36c2cc53d489e7";
    const formData = new FormData();
    formData.append("image", arquivo);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
    });

    const dados = await response.json();
    return dados.data.url;
}

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