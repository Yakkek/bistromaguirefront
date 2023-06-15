import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import backgroundImage from '../Styles/img/fundoazul.avif';

export const RegisterUser = () => {

  const nav = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if(data.get('firstName') == '' || data.get('lastName') == '' || data.get('email') == '' || data.get('password') == '') {
      alert('Preencha todos os campos')
      return
    }

    try {
      
        const res = await api.post('/cliente/criar', {
          nome: `${data.get('firstName')} ${data.get('lastName')}`,
          email: data.get('email'),
          senha: data.get('password'),
        })

        console.log(data.get('password'))

        if(res.data.id) {
          nav('/login-user')
        }

    } catch (error) {
      alert('Erro ao cadastrar usuário')
    }

  };

  return (
    <div
    style={{
      background: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Primeiro nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => nav('/login-user')} variant="body2" style={{
                  cursor: 'pointer'
                }}>
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  )
}
