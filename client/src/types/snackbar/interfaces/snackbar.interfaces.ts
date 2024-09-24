import { AlertColor } from "@mui/material";

export interface SnackbarAlertInterface {
    open: boolean
    severity: AlertColor
    message: string
    onClose: () => void
}

export interface SnackbarStateInterface {
    open: boolean
    message: string
    severity: "success" | "error" | "warning" | "info"
}
