import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Container, Divider, IconButton, List, Toolbar, Typography, Switch, FormControlLabel, PaletteMode } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import Badge from '@mui/material/Badge';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { mainListItems, secondaryListItems } from './listItems';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Copyright from './Copyright';

const Layout = ({ children }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const handleDarkModeToggle = (): void => {
    setDarkMode(!darkMode);
  };

  // Function to get design tokens based on mode
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              //light mode main color
              main: '#a6d8d9',
              contrastText: '#fff',
            },
            //light mode main color
            divider: '#a6d8d9',
            text: {
              primary: '#212121',
              secondary: '#424242',
            },
            background: {
              default: '#f5f5f5',
              paper: '#fff',
            },
          }
        : {
            primary: {
              //dark mode main color
              main: '#1c3454',
              contrastText: '#fff',
            },
            //dark mode main color
            divider: '#1c3454',
            background: {
              default: '#121212', // Custom dark background color
              paper: '#1e1e1e', // Custom dark paper color
            },
            text: {
              primary: '#e0e0e0', // Custom text color for dark mode
              secondary: '#9e9e9e',
            },
          }),
    },
  });

  const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

  // const theme = createTheme({
  //   palette: {
  //     mode: darkMode ? 'dark' : 'light',
  //     primary: {
  //       main: '#1c3454',
  //       contrastText: '#fff',
  //     },
  //   },
  // });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open} sx={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              WatchTower Dashboard
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  color='default'
                />
              }
              label='Dark Mode'
            />
            {/* <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            {children}
          </Container>
          <Box sx={{ py: 2, mt: 'auto' }}>
            <Container maxWidth='lg'>
              <Copyright />
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
