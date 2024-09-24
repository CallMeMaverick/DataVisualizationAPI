import axiosClient from "~/plugins/axiosClient.ts"
import { AxiosResponse } from "axios"
import URLs from "~/consts/api.ts"


interface UploadFileResponse {
    path: string
}

const fileService = {
    uploadFile: async (formData: FormData): Promise<AxiosResponse<UploadFileResponse>> => {
        return await axiosClient.post(URLs.file.upload, formData)
    }
}

export default fileService
