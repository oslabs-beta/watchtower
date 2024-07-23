import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems: JSX.Element = (
  <React.Fragment>
    <ListItemButton component={Link} to='/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemButton>
    <ListItemButton component={Link} to='/accountInfo'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='AWS Account Info' />
    </ListItemButton>
    <ListItemButton component={Link} to='/reports'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary='Reports' />
    </ListItemButton>
    {/* <ListItemButton component={Link} to='/integrations'>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary='Integrations' />
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems: JSX.Element = (
  <React.Fragment>
    <ListSubheader component='div' inset>
      Saved reports
    </ListSubheader>
    <ListItemButton component={Link} to='/reports/today'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Today' />
    </ListItemButton>
    <ListItemButton component={Link} to='/reports/this-week'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='This Week' />
    </ListItemButton>
    <ListItemButton component={Link} to='/reports/this-month'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='This Month' />
    </ListItemButton>
  </React.Fragment>
);
