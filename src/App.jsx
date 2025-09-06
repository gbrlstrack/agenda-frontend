import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CustomButton from './components/Button'
import LabeledInput from './components/LabeledInput'
import DeleteIcon from '@mui/icons-material/Delete';
import { useUsers } from './hooks/useUsers';
import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import EditDrawer from './components/EditDrawer';

function App() {
  const { data: users, isLoading, create, destroy } = useUsers();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })

  const handleChange = (evt) => {
    const value = evt.target.value
    const fieldName = evt.target.name
    setFormData(currentData => ({ ...currentData, [fieldName]: value }))
  }

  const onClickSave = () => {
    create(formData)
  }

  const onClear = () => {
    setFormData({ name: "", phone: "", email: "" })
  }

  return (
    <Grid container spacing={2} p={2} minHeight='100vh' width="100%" wrap='nowrap'>
      <Grid size={3} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <LabeledInput onChange={handleChange} value={formData.name} name="name" label="Nome" />
        <LabeledInput inputProps={{ maxLength: 11 }} onChange={handleChange} value={formData.phone} name="phone" label="Telefone" />
        <LabeledInput onChange={handleChange} value={formData.email} name="email" label="E-mail" />
        <CustomButton label="salvar" onClick={onClickSave} />
        <CustomButton color="secondary" label="limpar" onClick={onClear} />
      </Grid>
      <Grid size={9}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="tabela de usuários">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, bgcolor: '#1976d2', color: 'white' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: '#1976d2', color: 'white' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: '#1976d2', color: 'white' }}>Telefone</TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: '#1976d2', color: 'white' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ?
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow> : users?.map((user) => (
                  <TableRow key={user._id || user.email}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell align="right">
                      <Grid>
                        <IconButton onClick={() => destroy(user._id)}>
                          <DeleteIcon color="error" />
                        </IconButton>

                        <EditDrawer user={user} />
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default App
