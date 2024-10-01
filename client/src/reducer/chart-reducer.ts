import ChartState from "~/types"
import { Action } from "~/types"


export function chartReducer(state: ChartState, action: Action): ChartState {
    switch (action.type) {
        case "SET_COLUMNS":
            return { ...state, columns: action.payload }
        case "SET_X_AXIS":
            return { ...state, xAxis: action.payload }
        case "SET_Y_AXIS":
            return { ...state, yAxis: action.payload }
        case "SET_CHART_TYPE":
            return { ...state, chartType: action.payload }
        case "SET_TITLE":
            return { ...state, title: action.payload }
        case "SET_X_LABEL":
            return { ...state, xlabel: action.payload }
        case "SET_Y_LABEL":
            return { ...state, ylabel: action.payload }
        default:
            return state
    }
}
