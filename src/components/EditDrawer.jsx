import { Close, Edit } from "@mui/icons-material"
import { Drawer, Grid, IconButton } from "@mui/material"
import { useState } from "react"
import { useUsers } from "../hooks/useUsers"
import LabeledInput from "./LabeledInput"
import CustomButton from "./Button"

const EditDrawer = ({ user }) => {
    const { update } = useUsers()
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ name: user.name, phone: user.phone, email: user.email, _id: user._id })

    const handleChange = (evt) => {
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
        setFormData({ name: "", phone: "", email: "" })
    }

    return (
        <>
            <IconButton onClick={() => setIsOpen(true)}>
                <Edit color="info" />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={handleClose} sx={{ minWidth: "50vw" }}>
                <Grid container direction="column" mr={2} ml={2} spacing={.5}>
                    <Grid size={12} display='flex' flexGrow={1} justifyContent='right'>
                        <IconButton onClick={handleClose}>
                            <Close sx={{ color: "red" }} />
                        </IconButton>
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <LabeledInput onChange={handleChange} value={formData.name} name="name" label="Nome" />
                        <LabeledInput inputProps={{ maxLength: 11 }} onChange={handleChange} value={formData.phone} name="phone" label="Telefone" />
                        <LabeledInput onChange={handleChange} value={formData.email} name="email" label="E-mail" />
                        <CustomButton label="salvar" onClick={onClickSave} />
                        <CustomButton color="secondary" label="limpar" onClick={onClear} />
                    </Grid>
                </Grid>
            </Drawer>
        </>
    )
}

export default EditDrawer