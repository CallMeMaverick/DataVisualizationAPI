import axios, { AxiosInstance } from "axios"


const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export default axiosClient
