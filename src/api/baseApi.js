const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error("A variável de ambiente para a baseURL da API não está definida.");
}

async function baseApi(endpoint, { body, method, ...customOptions } = {}) {
    const headers = { "content-type": "application/json" }
    const config = {
        method: method ?? 'GET',
        ...customOptions,
        headers: {
            ...headers,
            ...customOptions.headers
        }
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    let response

    try {
        response = await fetch(`${baseURL}${endpoint}`, config)
    } catch (error) {
        console.log(error)
        return Promise.reject(new Error("Erro desconhecido na rede, tente novamente em instantes"))
    }

    if (response.ok) {
        if (response.status === 204) return Promise.resolve()
        try {
            const data = await response.json();
            return Promise.resolve(data);
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error('Falha ao processar informações'));
        }
    } else {
        const errorData = await response.json().catch(() => ({ message: 'A resposta não pôde ser lida.' }));
        const error = {
            status: response.status,
            message: errorData.message || response.statusText,
        };
        return Promise.reject(error);
    }
}

export const api = {
    get: (endpoint) => baseApi(endpoint, { method: 'GET' }),
    post: (endpoint, body) => baseApi(endpoint, { body, method: 'POST' }),
    put: (endpoint, body) => baseApi(endpoint, { method: 'PUT', body }),
    delete: (endpoint) => baseApi(endpoint, { method: 'DELETE' }),
}