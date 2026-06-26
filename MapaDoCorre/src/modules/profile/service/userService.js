import { API_URL } from "../../../shared/services/api";

export async function getPerfil(id) {
    const token = localStorage.getItem("token"); // Pega o token salvo no login

    const response = await fetch(`${API_URL}/clientes/findbyid/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Envia o token de segurança
        }
    });

    return response;
}
