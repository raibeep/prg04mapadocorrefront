import { API_URL } from "../../../shared/services/api";

export async function getEmpresario(empresarioId) {
    const token = localStorage.getItem("token");
    return await fetch(`${API_URL}/empresarios/findbyid/${empresarioId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function getNegocioDoEmpresario(empresarioId) {
    const token = localStorage.getItem("token");
    return await fetch(`${API_URL}/empresarios/${empresarioId}/negocios`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}