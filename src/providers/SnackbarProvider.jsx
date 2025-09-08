import { forwardRef, useState } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { Snackbar, Alert as AlertMui } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
    return <AlertMui elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider = ({ children }) => {
    const [config, setConfig] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = (message, severity = 'success') => {
        setConfig({ open: true, message, severity });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setConfig(prev => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={config.open} autoHideDuration={5000} onClose={handleClose} >
                <Alert onClose={handleClose} severity={config.severity} sx={{ width: '100%' }}>
                    {config.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};