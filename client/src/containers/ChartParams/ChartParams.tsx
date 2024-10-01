import { Box } from "@mui/material"
import { useChart } from "~/context/chart-context.tsx"
import chartParamsStyles from "./ChartParams.styles.ts"
import ChartParameter from "~/components/Autocomplete/ChartParameter.tsx"
import { chartTypes } from "~/consts/options.ts"

function ChartParams() {
    const { state, dispatch } = useChart()

    const { columns, xAxis, yAxis, chartType, title, xlabel, ylabel } = state

    const chartParameters = [
        {
            staticInput: true,
            label: "Title",
            value: title,
            onChange: (event: any) => dispatch({ type: "SET_TITLE", payload: event.target.value }),
        },
        {
            staticInput: true,
            label: "X-Label",
            value: xlabel,
            onChange: (event: any) => dispatch({ type: "SET_X_LABEL", payload: event.target.value }),
        },
        {
            staticInput: true,
            label: "Y-Label",
            value: ylabel,
            onChange: (event: any) => dispatch({ type: "SET_Y_LABEL", payload: event.target.value }),
        },
        {
            label: "X-Axis",
            value: xAxis,
            options: columns.filter((col: string | null) => col !== yAxis),
            onChange: (_: any, newValue: string | null) => dispatch({ type: "SET_X_AXIS", payload: newValue }),
        },
        {
            label: "Y-Axis",
            value: yAxis,
            options: columns.filter((col: string | null) => col !== xAxis),
            onChange: (_: any, newValue: string | null) => dispatch({ type: "SET_Y_AXIS", payload: newValue }),
        },
        {
            label: "Chart type",
            value: chartType,
            options: chartTypes,
            onChange: (_: any, newValue: string | null) => dispatch({ type: "SET_CHART_TYPE", payload: newValue }),
        },
    ]

    return (
        <Box sx={chartParamsStyles.wrapper}>
            <Box sx={chartParamsStyles.autoCompletes}>
                {chartParameters.map((param, index) => (
                    <ChartParameter
                        key={index}
                        label={param.label}
                        value={param.value}
                        options={param.options || []}
                        onChange={param.onChange}
                        sx={chartParamsStyles.autoComplete}
                        staticInput={param.staticInput || false}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default ChartParams
