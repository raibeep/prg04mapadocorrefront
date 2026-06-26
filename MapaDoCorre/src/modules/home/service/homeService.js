import { API_URL } from "../../../shared/services/api";

export async function getNegocios() {
    const token = localStorage.getItem("token");

    return fetch(`${API_URL}/negocios/findall`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}