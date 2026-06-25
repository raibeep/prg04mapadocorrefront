import { API_URL } from "../../../shared/services/api";

export async function register(dados) {
    return fetch(`${API_URL}/usuarios/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}