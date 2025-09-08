import { Close, Edit } from "@mui/icons-material"
import { Drawer, Grid, IconButton } from "@mui/material"
import { useState } from "react"
import { useUsers } from "../hooks/useUsers"
import LabeledInput from "./LabeledInput"
import CustomButton from "./Button"
import UserForm from "./UserForm"

const EditDrawer = ({ user }) => {
    const { update, clearErrors, getError } = useUsers()
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ name: user.name, phone: user.phone, email: user.email, _id: user._id })

    const handleChange = (evt) => {
        clearErrors()
        const value = evt.target.value
        const fieldName = evt.target.name
        setFormData(currentData => ({ ...currentData, [fieldName]: value }))
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const onClickSave = () => {
        update(formData)
    }

    const onClear = () => {
        clearErrors()
        setFormData({ name: "", phone: "", email: "" })
    }

    return (
        <>
            <IconButton onClick={() => setIsOpen(true)}>
                <Edit color="info" />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={handleClose} sx={{ minWidth: "50vw" }}>
                <Grid container direction="column" mr={2} ml={2} spacing={.5} sx={{ minWidth: "60vw" }}>
                    <Grid size={12} display='flex' flexGrow={1} justifyContent='right'>
                        <IconButton onClick={handleClose}>
                            <Close sx={{ color: "red" }} />
                        </IconButton>
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <UserForm
                            formData={formData}
                            handleChange={handleChange}
                            getError={getError}
                            onClear={onClear}
                            onSave={onClickSave}
                        />
                    </Grid>
                </Grid>
            </Drawer>
        </>
    )
}

export default EditDrawer