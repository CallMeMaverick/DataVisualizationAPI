export type Action =
    | { type: "SET_COLUMNS", payload: string[] }
    | { type: "SET_X_AXIS", payload: string | null }
    | { type: "SET_Y_AXIS", payload: string | null }
    | { type: "SET_CHART_TYPE", payload: string | null }
    | { type: "SET_TITLE", payload: string | null }
    | { type: "SET_X_LABEL", payload: string | null }
    | { type: "SET_Y_LABEL", payload: string | null }
