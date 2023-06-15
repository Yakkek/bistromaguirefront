import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/cart';
import logo from '../Styles/img/logo.jpg';

interface HeaderProps {
  type?: 'user' | 'admin'
}

export const Header = ({ type = 'user' }: HeaderProps) => {

  const nav = useNavigate()

  const { signOut, user } = useAuth()
  const { removeAllProducts } = useCart()

  const pagesUser = [
    {
      event: () => {
        signOut()
        removeAllProducts()
        nav('/')
      },
      text: 'Logout'
    },
    {
      event: () => nav('/menu'),
      text: 'CARDAPIO'
    },
    {
      event: () => nav('/cart'),
      text: 'Carrinho'
    }
  ]

  const pagesAdmin = [
    {
      event: () => {
        signOut()
        removeAllProducts()
        nav('/')
      },
      text: 'Logout' 
    }
  ]

  const settings = ['Sair'];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = type === 'user' ? pagesUser : pagesAdmin

  return (
    <AppBar position="static" style={{
     // backgroundColor: type === 'user' ? '#f81405' : '#1976d2',
      backgroundColor: 'rgba(0, 123, 255, 0.8)',
    }}>
      <Container maxWidth="xl">
      <Toolbar disableGutters>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={logo} alt="Logo" sx={{ width: 60, height: 60, marginRight: '10px' }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BISTRO MANGIARE
          </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {  pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={page.event}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#fff",
                    color: type === 'user' ? '#f81404' : '#1976d2',
                    fontWeight: 700,
                  }}
                >
                  {user?.name.split('')[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} onClickCapture={() => {
                  removeAllProducts()
                  signOut()
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

