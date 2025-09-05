// requestHandler.js
export const requestHandler = (fn) => {
    return async (...args) => {
        try {
            const data = await fn(...args);
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };
};
