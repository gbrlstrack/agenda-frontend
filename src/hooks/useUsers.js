import { useState, useEffect } from "react";
import { userApi } from "../api/userApi";
import { useSnackbar } from "./useSnackBar";

export function useUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        userApi.getAll()
            .then(users => { if (mounted) setData(users.data) })
            .catch(err => { if (mounted) setApiError(err) })
            .finally(() => { if (mounted) setLoading(false) });
        return () => { mounted = false };
    }, []);

    const create = async (user) => {
        const result = await userApi.create(user)
        if (result.error) {
            console.error("Erro ao criar usuário:", result.error);
            showSnackbar(result.error.message, "error")
            setApiError(result.error);
            return;
        }
        showSnackbar("Usuário criado com sucesso!", "success")
        const newUser = result.data
        setData(currentUsers => [...currentUsers, newUser])
    }

    const destroy = async (id) => {
        const result = await userApi.destroy({ id })

        if (result.error) {
            console.error("Erro ao criar usuário:", result.error);
            setApiError(result.error);
            return;
        }
        showSnackbar("Usuário deletado com sucesso!", "success")
        setData(currentUsers =>
            currentUsers.filter(user => user._id !== id)
        );
    }

    const update = async (user) => {
        const result = await userApi.update(user)

        if (result.error) {
            showSnackbar(result.error.message, "error")
            console.error("Erro ao atualizar usuário:", result.error);
            setApiError(result.error);
            return;
        }

        showSnackbar("Usuário atualizado com sucesso!", "success")
        const updatedUser = result.data;
        setData(currentUsers => currentUsers.map(oldUser =>
            oldUser._id === updatedUser._id ? updatedUser : oldUser
        ));
    }

    const clearErrors = () => {
        setApiError(null);
    };

    const getError = (fieldName) => {
        if (!apiError || !apiError.erros || !Array.isArray(apiError.erros)) {
            return undefined;
        }
        const fieldError = apiError.erros.find(err => err.field === fieldName);
        return fieldError ? fieldError.message : undefined;
    };

    return { data, loading, apiError, create, destroy, update, getError, clearErrors };
}