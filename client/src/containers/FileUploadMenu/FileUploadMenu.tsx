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
    LinearProgress,
    Alert,
    TextField
} from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'


function FileUploadMenu() {
    const [file, setFile] = useState<File | null>(null)
    const [uploadedPath, setUploadedPath] = useState<string>('')
    const [uploading, setUploading] = useState<boolean>(false)
    const [uploaded, setUploaded] = useState<boolean | undefined>(undefined)
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
        setUploaded(false)

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
            setUploaded(true)
            setUploading(false)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbar({...snackbar, open: false})
    }


    return (
        <Box sx={fileUploadMenuStyles.wrapper}>
            <Box>
                <Typography variant={"h3"} sx={fileUploadMenuStyles.heading}>
                    {text.files.upload}
                </Typography>

                <form
                    onSubmit={handleFileSubmit}
                    style={fileUploadMenuStyles.formButtons}
                >
                    <Box sx={fileUploadMenuStyles.fileInput}>
                        <TextField
                            value={file ? file.name : ''}
                            variant="outlined"
                            placeholder="No file selected"
                            fullWidth
                            slotProps={{
                                input: {
                                    sx: fileUploadMenuStyles.fileTextField,
                                },
                            }}
                            sx={fileUploadMenuStyles.a}
                        />
                        <input
                            type="file"
                            id="file-input"
                            style={fileUploadMenuStyles.input}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-input">
                            <Button
                                variant="contained"
                                component="span"
                                sx={fileUploadMenuStyles.fileInput}
                            >
                                <FolderOpenIcon sx={{ marginRight: 1 }} />
                                Select a File
                            </Button>
                        </label>
                    </Box>


                    {file && (
                        <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">
                            <Typography component={"p"} sx={fileUploadMenuStyles.uploadedFile}>
                                {text.files.selectedFile}
                                <Typography component={"span"} sx={fileUploadMenuStyles.fileName}>
                                    {file.name}
                                </Typography>
                            </Typography>
                        </Alert>
                    )}

                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={uploaded || !file}
                            sx={fileUploadMenuStyles.buttons}
                        >
                            {
                                uploaded === undefined
                                    ? text.files.upload
                                    : uploaded
                                    ? text.files.uploaded
                                    : text.files.uploading
                            }
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
        </Box>
    )
}

export default FileUploadMenu
