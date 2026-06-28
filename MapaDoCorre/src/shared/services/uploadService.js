export async function uploadImagem(arquivo) {
    const apiKey = "af3bdd857345f9631b36c2cc53d489e7";

    const formData = new FormData();
    formData.append("image", arquivo);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao enviar imagem.");
    }

    const dados = await response.json();

    return dados.data.url;
}