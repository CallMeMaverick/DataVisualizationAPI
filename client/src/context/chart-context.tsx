import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { chartReducer } from "~/reducer/chart-reducer.ts"
import ChartState from "~/types"
import { Action } from "~/types"


const initialState: ChartState = {
    columns: [],
    xAxis: null,
    yAxis: null,
    chartType: null,
    title: null,
    xlabel: null,
    ylabel: null,
}

interface ChartContextType {
    state: ChartState;
    dispatch: React.Dispatch<Action>
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(chartReducer, initialState)

    return (
        <ChartContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartContext.Provider>
    )
}

export const useChart = () => {
    const context = useContext(ChartContext)
    return context
}
