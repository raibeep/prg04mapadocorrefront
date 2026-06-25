import { API_URL } from "../../../shared/services/api";

export async function verificarEmail(email) {
    return fetch(`${API_URL}/usuarios/verificar-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    });
}