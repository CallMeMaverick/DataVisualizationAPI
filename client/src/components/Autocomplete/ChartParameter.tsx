import { TextField, Autocomplete } from "@mui/material"
import ChartParameterInterface from "~/types/index.ts"


function ChartParameter({ label, value, options, onChange, sx, staticInput }: ChartParameterInterface) {
    return (
        staticInput ? (
            <TextField
                sx={sx}
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
            />
        ) : (
            <Autocomplete
                sx={sx}
                options={options}
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                    />
                )}
            />
        )
    )
}

export default ChartParameter
