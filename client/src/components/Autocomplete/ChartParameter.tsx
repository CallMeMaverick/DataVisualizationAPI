import React from "react"
import { TextField, Autocomplete, SxProps } from "@mui/material"

interface ChartParameterInterface {
    label: string
    value: string | null
    options: string[]
    onChange: (event: React.SyntheticEvent, value: string | null) => void
    sx?: SxProps
}

function ChartParameter({ label, value, options, onChange, sx }: ChartParameterInterface) {
    return (
        <Autocomplete
            sx={sx}
            options={options}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                />
            )}
        />
    )
}

export default ChartParameter
