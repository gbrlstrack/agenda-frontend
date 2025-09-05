import { Button } from "@mui/material"

const CustomButton = ({ label, ...rest }) => {
    return (
        <Button variant="contained" {...rest}>
            {label}
        </Button>
    )
}

export default CustomButton