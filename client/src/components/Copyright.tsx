import * as React from 'react';
import { Typography, Link } from '@mui/material';

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://watch-tower.co/'>
        WatchTower
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
