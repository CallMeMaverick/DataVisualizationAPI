import React, { useState } from "react"
import SnackbarAlert from "~/components/Snackbar/SnackbarAlert.tsx"
import errors from "~/consts/errors.ts"
import text from "~/consts/text.ts"
import axiosClient from "~/plugins/axiosClient.ts"
import URLs from "~/consts/api.ts"
import { SnackbarStateInterface } from "~/types"
import fileUploadMenuStyles from "./FileUploadMenu.styles.ts"
import {
    Box,
    Button,
    Typography,
    LinearProgress
} from "@mui/material"



function FileUploadMenu() {
    const [file, setFile] = useState<File | null>(null)
    const [uploadedPath, setUploadedPath] = useState<string>('')
    const [uploading, setUploading] = useState<boolean>(false)
    const [snackbar, setSnackbar] = useState<SnackbarStateInterface>({
        open: false,
        message: '',
        severity: "success"
  })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        }
    }

    const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!file) {
            setSnackbar({
                open: true,
                message: errors.files.noFile,
                severity: "error"
            })

            return
        }

        setUploading(true)

        const formData = new FormData()
        if (file) {
            formData.append("file", file)
        }

        try {
            const response = await axiosClient.post(URLs.file.upload, formData)

            setTimeout(() => {
                if (response.status === 200) {
                setUploadedPath(response.data.path)

                setSnackbar({
                    open: true,
                    message: errors.files.uploaded,
                    severity: "success"
                })
            } else {
                setSnackbar({
                    open: true,
                    message: errors.file.badRequest,
                    severity: "error"
                })
                }
            }, 1000)
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.detail || "An error occurred",
                severity: "error",
            })
        } finally {
            setUploading(false)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbar({...snackbar, open: false})
    }


    return (
        <Box>
            <Typography>
                {text.files.upload}
            </Typography>

            <form onSubmit={handleFileSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={fileUploadMenuStyles.input}
                    id={"uploaded-file"}
                />

                <label htmlFor="uploaded-file">
                    <Button variant={"contained"} component={"span"}>
                        {text.files.uploadButton}
                    </Button>
                </label>

                {file && (
                    <Typography variant={"body1"} gutterBottom>
                        {text.files.selectedFile}: {file.name}
                    </Typography>
                )}

                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={uploading}
                    >
                        {uploading ? text.files.uploading : text.files.uploaded}
                    </Button>
                </Box>
            </form>

            {uploading && (
                <Box mt={2}>
                    <LinearProgress />
                </Box>
            )}

            <SnackbarAlert
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleSnackbarClose}
            />
        </Box>
    )
}

export default FileUploadMenu
