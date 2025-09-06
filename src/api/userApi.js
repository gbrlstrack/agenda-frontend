import { api } from "./baseApi";
import { requestHandler } from "./requestHandler";

const endpoint = '/users'

const userApi = {
    getAll: requestHandler(() => api.get(endpoint)),
    getById: requestHandler(({ id }) => api.get(`${endpoint}/${id}`)),
    create: requestHandler((user) => api.post(endpoint, user)),
    destroy: requestHandler(({ id }) => api.destroy(`${endpoint}/${id}`)),
    update: requestHandler((user) => api.put(`${endpoint}/${user._id}`, user)),
}

export { userApi }