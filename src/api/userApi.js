import { api } from "./baseApi";
import { requestHandler } from "./requestHandler";

const endpoint = '/users'

const userApi = {
    getAll: requestHandler(() => api.get(endpoint)),
    getById: requestHandler(({ id }) => api.get(`${endpoint}/${id}`)),
    create: requestHandler(({ user }) => api.post(endpoint, { body: user })),
    delete: requestHandler(({ id }) => api.delete(`${endpoint}/${id}`))
}

export { userApi }