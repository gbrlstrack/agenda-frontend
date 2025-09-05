import { Container, Grid } from '@mui/material'
import CustomButton from './components/Button'
import LabeledInput from './components/LabeledInput'
import { useUsers } from './hooks/useUsers';

function App() {
  const { data: users, isLoading, error } = useUsers();
  console.log(users)
  return (
    <Grid container columns={2} width="100%" p={2} columnGap={2}>
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <LabeledInput label="Nome" />
        <LabeledInput label="Telefone" />
        <LabeledInput label="E-mail" />
        <CustomButton label="salvar" />
        <CustomButton color="secondary" label="limpar" />
      </Grid>
      <Grid>
        {/* {users.map((user) =>)} */}
      </Grid>
    </Grid>
  )
}

export default App
