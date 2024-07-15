import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { mainListItems, secondaryListItems } from './listItems';
import StatusBox from './StatusBox';
import AppBar from './AppBar';
import Drawer from './Drawer';
import GraphContainer from './GraphContainer';
import BedrockAnalysis from './BedrockAnalysis';
import Copyright from './Copyright';
import { ProvisionFormData } from '../../types/types';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);

  const handleFormSubmit = async (data: ProvisionFormData) => {
    try {
      setCurrentProvision(data);
      console.log('Provision saved', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
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
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', mb: 2 }}
                >
                  <StatusBox onSubmit={handleFormSubmit} />
                </Paper>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BedrockAnalysis />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <GraphContainer currentProvision={currentProvision} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
