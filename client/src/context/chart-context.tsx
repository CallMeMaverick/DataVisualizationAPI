import { useState, createContext, useContext, ReactNode } from "react"


interface ChartContextType {
    columns: string[]
    setColumns: (columns: string[]) => void

    xAxis: string | null
    setXAxis: (xAxis: string | null) => void

    yAxis: string | null
    setYAxis: (yAxis: string | null) => void

    chartType: string | null
    setChartType: (chartType: string | null) => void
}

const ChartContext = createContext<ChartContextType | undefined>(undefined)

export const ChartProvider = ({ children }: { children: ReactNode }) => {
    const [columns, setColumns] = useState<string[]>([]);
    const [xAxis, setXAxis] = useState<string | null>(null);
    const [yAxis, setYAxis] = useState<string | null>(null);
    const [chartType, setChartType] = useState<string | null>(null);

    return (
        <ChartContext.Provider
            value={{
                columns,
                setColumns,
                xAxis,
                setXAxis,
                yAxis,
                setYAxis,
                chartType,
                setChartType
            }}
        >
            {children}
        </ChartContext.Provider>
    )
}

export const useChart = () => {
    const context = useContext(ChartContext)
    return context
}
