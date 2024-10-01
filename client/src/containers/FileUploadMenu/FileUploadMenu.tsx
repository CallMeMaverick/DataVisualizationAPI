import React, { useState } from "react"
import SnackbarAlert from "~/components/Snackbar/SnackbarAlert.tsx"
import errors from "~/consts/errors.ts"
import text from "~/consts/text.ts"
import fileService from "~/services/fileService.ts"
import { SnackbarStateInterface } from "~/types"
import { useChart } from "~/context/chart-context.tsx";
import fileUploadMenuStyles from "./FileUploadMenu.styles.ts"
import {
    Box,
    Button,
    Typography,
    LinearProgress,
    Alert,
    TextField,
    Fade
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import ChartParams from "../ChartParams/ChartParams.tsx"


function FileUploadMenu() {
    const { setColumns } = useChart()

    const [file, setFile] = useState<File | undefined>( undefined)
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
            const response = await fileService.uploadFile(formData)
            if (response.status === 200) {
                setColumns(response.data.columns)

                setSnackbar({
                    open: true,
                    message: text.files.uploaded,
                    severity: "success"
                })
            } else {
                setSnackbar({
                    open: true,
                    message: errors.file.badRequest,
                    severity: "error"
                })
            }
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

    const successfulUpload = snackbar.message === text.files.uploaded

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
                            sx={fileUploadMenuStyles.buttons}
                        >
                            {text.files.upload}
                        </Button>
                    </Box>
                </form>

                <SnackbarAlert
                    open={snackbar.open}
                    severity={snackbar.severity}
                    message={snackbar.message}
                    onClose={handleSnackbarClose}
                />
            </Box>

            {successfulUpload && (
                <Fade in={successfulUpload}>
                    <div>
                        <ChartParams />
                    </div>
                </Fade>
            )}
        </Box>
    )
}

export default FileUploadMenu
