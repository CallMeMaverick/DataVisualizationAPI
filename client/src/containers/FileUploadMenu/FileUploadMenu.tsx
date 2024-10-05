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
    Alert,
    TextField,
    Fade
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import ChartParams from "../ChartParams/ChartParams.tsx"
import { useSnackBar } from "~/context/snackbar-context.tsx"


function FileUploadMenu() {
    const { dispatch } = useChart()
    const { showSnackbar } = useSnackBar()

    const [file, setFile] = useState<File | undefined>( undefined)
    const [uploading, setUploading] = useState<boolean>(false)
    const [snackbarStatus, setSnackbarStatus] = useState<boolean>(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        }
    }

    const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!file) {
            showSnackbar(errors.files.noFile, "error")
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
                dispatch({ type: "SET_COLUMNS", payload: response.data.columns })

                showSnackbar(text.files.uploaded, "success")
                setSnackbarStatus(true)
            } else {
                showSnackbar(errors.files.badRequest, "error")
            }
        } catch (error: any) {
            showSnackbar(errors.files.badRequest, "error")
        } finally {
            setUploading(false)
        }
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
            </Box>

            {snackbarStatus && (
                <Fade in={snackbarStatus}>
                    <div>
                        <ChartParams />
                    </div>
                </Fade>
            )}
        </Box>
    )
}

export default FileUploadMenu
