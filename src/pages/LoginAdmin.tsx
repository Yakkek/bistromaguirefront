import { FormEvent, useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { api } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import '../Styles/LoginAdmin.css';
import logo from '../Styles/img/logo.jpg';
import Avatar from '@mui/material/Avatar';


export const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const nav = useNavigate()
  const { setUser, setAuthenticated } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if(!username || !password) {
      alert('Preencha todos os campos')
      return
    }
    if (!isRobotChecked) {
      alert('Por favor, marque a caixa "Não sou um robô"');
      return;
    }


    try {
      const result = await api.post('/administrador/login', {
        email: username,
        senha: password
      })

      const data = result.data

      if (data.id) {
        localStorage.setItem('admin', JSON.stringify(data))
        setUser({
          id: data.id,
          email: data.email,
          name: data.nome
        })
        setAuthenticated(true)
        nav('/panel')
      }
    } catch (error) {
      alert('Credenciais inválidas')
    }

  };

  return (
    <div className="login-admin-container">
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >

       <Paper style={{ padding: '20px', width: '300px', border: '1px solid #ccc' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar src={logo} alt="Logo" style={{ width: 80, height: 80,marginRight: '10px' }} />
            <Typography variant="h6">BISTRO MANGIARE</Typography>
          </div>

          <Typography variant="h6" style={{ textAlign: 'center', margin: 'auto' }}>
              Realize o seu Login
            </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <div style={{ marginTop: '20px' }}>
          <input
                type="checkbox"
                id="robotCheckbox"
                checked={isRobotChecked}
                onChange={(e) => setIsRobotChecked(e.target.checked)}
                required
              />
              <label htmlFor="robotCheckbox">Não sou um robô</label>
            </div>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '10px'}}>
            Entrar
          </Button>
        </form>
      </Paper>
    </div> 
    </div>
  );
 
};
