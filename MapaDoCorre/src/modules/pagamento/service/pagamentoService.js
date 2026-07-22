import { API_URL } from "../../../shared/services/api";

const URL = `${API_URL}/pedidos`;

export async function criarPedido(pedido) {
  const token = localStorage.getItem("token");
  
  return fetch(`${URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });
}

export async function getMeusPedidos() {
  const token = localStorage.getItem("token");

  return fetch(`${URL}/findall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function finalizarPedido(pedido) {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}/pedidos/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });
}
