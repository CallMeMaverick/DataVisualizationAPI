import axiosClient from "~/plugins/axiosClient.ts"
import { AxiosResponse } from "axios"
import URLs from "~/consts/api.ts"
import ChartState from "~/types/index"

const chartService = {
    plotGraph: async (chartParams: ChartState): Promise<AxiosResponse<Blob>> => {
        return await axiosClient.post(URLs.chart.plot, chartParams, {
            headers: {
                "Content-Type": "application/json"
            },
            responseType: "blob"
        })
    }
}

export default chartService
