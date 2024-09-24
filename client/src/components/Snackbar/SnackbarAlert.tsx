import { Alert, Snackbar } from "@mui/material"
import { SnackbarAlertInterface } from "~/types"

function SnackbarAlert({ open, severity, message, onClose }: SnackbarAlertInterface) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert
