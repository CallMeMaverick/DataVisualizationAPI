import React, {useState, createContext, useContext} from "react"
import { SnackbarStateInterface } from "~/types"
import SnackbarAlert from "~/components/Snackbar/SnackbarAlert.tsx"

interface SnackbarContextType {
    showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [snackbar, setSnackbar] = useState<SnackbarStateInterface>({
        open: false,
        message: '',
        severity: 'success',
    })

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setSnackbar({
            open: true,
            message,
            severity
        })
    }

    const handleSnackbarClose = () => {
        setSnackbar({...snackbar, open: false})
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <SnackbarAlert
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleSnackbarClose}
            />
        </SnackbarContext.Provider>
    )
}

export const useSnackBar = () => {
    const context = useContext(SnackbarContext)
    return context
}
