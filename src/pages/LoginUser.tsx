import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { api } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import backgroundImage from '../Styles/img/fundoazul.avif';
import logo from '../Styles/img/logo.jpg';


export const LoginUser = () => {

    const { setUser, setAuthenticated } = useAuth()  
    const nav = useNavigate()
    const [isRobotChecked, setIsRobotChecked] = React.useState(false); 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

        if (!isRobotChecked) {
          alert('Por favor, marque a opção "Não sou um robô"');
          return;
        }
        try {
          const res = await api.post('/cliente/login', {
            email: data.get('email'),
            senha: data.get('password'),
          });
    
          if (res.data.id) {
            setAuthenticated(true);
          setUser({
            id: res.data.id,
            name: res.data.nome,
            email: res.data.email
          })

          nav('/menu')
        }

      }
      catch (error) {
        alert('Erro ao fazer login')
      }

    };
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsRobotChecked(event.target.checked);
    };
  return (
    //<Container className="login-admin-container">
    <div
    style={{
      background: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end', 
      paddingRight: '20px', 
    }}
  >

  
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
          >
         <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Avatar
              src={logo}
              alt="Logo"
              sx={{ width: 80, height: 80, marginRight: '10px' }}
            />
            <Typography variant="h5">BISTRO MANGIARE</Typography>
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Checkbox
                checked={isRobotChecked}
                onChange={handleCheckboxChange}
                required
                color="primary"
              />
              <Typography variant="body2" color="textSecondary">
                Não sou um robô
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => nav('/register-user')} variant="body2" style={{
                  cursor: 'pointer'
                }}>
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
  )
}
