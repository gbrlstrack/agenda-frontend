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
            .then(users => { if (mounted) setData(users) })
            .catch(err => { if (mounted) setError(err) })
            .finally(() => { if (mounted) setLoading(false) });
        return () => { mounted = false };
    }, []);

    return { data, loading, error };
}