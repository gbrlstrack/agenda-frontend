import { useState, useEffect } from "react";
import { userApi } from "../api/userApi";

export function useUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        userApi.getAll()
            .then(users => { if (mounted) setData(users.data) })
            .catch(err => { if (mounted) setError(err) })
            .finally(() => { if (mounted) setLoading(false) });
        return () => { mounted = false };
    }, []);

    const create = async (user) => {
        const result = await userApi.create(user)
        if (result.error) {
            console.error("Erro ao criar usuário:", result.error);
            setError(result.error);
            return;
        }

        const newUser = result.data
        setData(currentUsers => [...currentUsers, newUser])
    }

    const destroy = async (id) => {
        const result = await userApi.destroy({ id })

        if (result.error) {
            console.error("Erro ao criar usuário:", result.error);
            setError(result.error);
            return;
        }

        setData(currentUsers =>
            currentUsers.filter(user => user._id !== id)
        );
    }

    const update = async (user) => {
        const result = await userApi.update(user)

        if (result.error) {
            console.error("Erro ao atualizar usuário:", result.error);
            setError(result.error);
            return;
        }

        const updatedUser = result.data;
        setData(currentUsers => currentUsers.map(oldUser =>
            oldUser._id === updatedUser._id ? updatedUser : oldUser
        ));
    }

    return { data, loading, error, create, destroy, update };
}