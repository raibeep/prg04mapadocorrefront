import { API_URL } from "../../../shared/services/api";

export async function login(email, senha) {
    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        }
    );

    return response;
}