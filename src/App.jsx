import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useUsers } from './hooks/useUsers';
import React, { useState } from 'react';
import EditDrawer from './components/EditDrawer';
import UserForm from './components/UserForm';

function App() {
  const { data: users, isLoading, create, destroy, getError, clearErrors } = useUsers();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })

  const handleChange = (evt) => {
    clearErrors();

    const value = evt.target.value
    const fieldName = evt.target.name
    setFormData(currentData => ({ ...currentData, [fieldName]: value }))
  }

  const onClickSave = () => {
    create(formData)
  }

  const onClear = () => {
    clearErrors();
    setFormData({ name: "", phone: "", email: "" })
  }

  const renderContent = () => {
    if (users.length === 0) return (<TableRow>
      <TableCell>
        <Typography>Sem dados</Typography>
      </TableCell>
    </TableRow>
    )

    return users?.map((user) => (
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
    ))
  }

  return (
    <Grid container spacing={2} p={2} minHeight='100vh' width="100%" wrap='nowrap'>
      <Grid size={4} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <UserForm
          formData={formData}
          handleChange={handleChange}
          getError={getError}
          onClear={onClear}
          onSave={onClickSave}
        />
      </Grid>
      <Grid size={8}>
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
                </TableRow> : renderContent()}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default App
