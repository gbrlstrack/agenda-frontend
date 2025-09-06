import { Container, Grid, TextField, Typography } from "@mui/material"

const LabeledInput = ({ label, value, onChange, name, ...rest }) => {
    return (
        <Grid container rows={1} columns={2} gridAutoFlow="row" alignItems="center" columnGap={1} justifyContent="space-between">
            <Typography>
                {label}
            </Typography>
            <TextField name={name} label={label} value={value} onChange={onChange} {...rest}  />
        </Grid>
    )
}

export default LabeledInput