import { API_URL } from "../../../shared/services/api";

export async function registerCliente(dados) {

    return fetch(`${API_URL}/clientes/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function registerEmpresario(dados) {

    return fetch(`${API_URL}/empresarios/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}