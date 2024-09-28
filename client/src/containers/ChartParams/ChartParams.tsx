import { Box } from "@mui/material"
import { useChart } from "~/context/chart-context.tsx"
import chartParamsStyles from "./ChartParams.styles.ts"
import ChartParameter from "~/components/Autocomplete/ChartParameter.tsx"
import { chartTypes } from "~/consts/options.ts"

function ChartParams() {
    const {
        columns,
        xAxis,
        setXAxis,
        yAxis,
        setYAxis,
        chartType,
        setChartType
    } = useChart()

    const chartParameters = [
        {
            label: "X-Axis",
            value: xAxis,
            options: columns.filter((col: string | null) => col !== yAxis),
            onChange: (_: any, newValue: string | null) => setXAxis(newValue)
        },
        {
            label: "Y-Axis",
            value: yAxis,
            options: columns.filter((col: string | null) => col !== xAxis),
            onChange: (_: any, newValue: string | null) => setYAxis(newValue)
        },
        {
            label: "Chart type",
            value: chartType,
            options: chartTypes,
            onChange: (_: any, newValue: string | null) => setChartType(newValue)
        }
    ]

    return (
        <Box sx={chartParamsStyles.wrapper}>
            <Box sx={chartParamsStyles.autoCompletes}>
                {chartParameters.map((param, index) => (
                    <ChartParameter
                        key={index}
                        label={param.label}
                        value={param.value}
                        options={param.options}
                        onChange={param.onChange}
                        sx={chartParamsStyles.autoComplete}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default ChartParams
