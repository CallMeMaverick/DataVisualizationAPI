import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ChartProvider } from "./context/chart-context.tsx"
import { SnackbarProvider } from "./context/snackbar-context.tsx"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <ChartProvider>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </ChartProvider>
        </StrictMode>
    </BrowserRouter>
)
