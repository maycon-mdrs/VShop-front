import axios from "axios";

/**
 * Criação de uma instância do Axios para realizar requisições à API.
 */
export const Api = axios.create({
    baseURL: "http://127.0.0.1:5171/api/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});

/**
 * Inicializa a instância do Axios com um interceptador de resposta personalizado.
 * @param {Function} onUnauthorized - Função de callback que será chamada quando uma resposta 401 for recebida.
 */
/* export const initializeAxios = (onUnauthorized: { (): void; (): void; }) => {
    Api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                onUnauthorized(); // Chama a função de callback para redirecionar
                deleteUserLocalStorage();
                message.error("Sessão expirada! Faça login novamente.");
            }
            console.log(error);
        }
    );
}; */
