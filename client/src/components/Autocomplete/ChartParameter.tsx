import { TextField, Autocomplete } from "@mui/material"
import ChartParameterInterface from "~/types/index.ts"


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
