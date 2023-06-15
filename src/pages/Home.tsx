import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


export const Home = () => {

  const nav = useNavigate()

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Card style={{ margin: "10px", backgroundColor: '#1150af', color: '#fff', cursor: 'pointer'}} onClick={() => {
          nav('/login-user')
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Login como Usuário
            </Typography>
            {/* Adicione aqui o conteúdo do card para login de usuário */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card style={{ margin: "10px", backgroundColor: '#1150af', color: '#fff', cursor: 'pointer'}} onClick={() => {
          nav('/login-admin')
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Login como Administrador
            </Typography>
            {/* Adicione aqui o conteúdo do card para login de administrador */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
