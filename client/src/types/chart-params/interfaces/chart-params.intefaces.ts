import React from "react"
import { SxProps } from "@mui/material"

export default interface ChartParameterInterface {
    label: string
    value: string | null
    options: string[]
    onChange: (event: React.SyntheticEvent, value: string | null) => void
    sx?: SxProps
}
