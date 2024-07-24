import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubButton = (): JSX.Element => {
  const gitHubClientID: string = 'Ov23li0zDnhtAMGQIJfT';

  const handleGitHubRedirect = () => {
    console.log('gitHubRedirect');

    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${gitHubClientID}`
    );
  };

  return (
    <Button sx={{ mt: 3, mb: 2 }} onClick={handleGitHubRedirect}>
      <GitHubIcon sx={{ mr: 1 }} />
      Login with GitHub
    </Button>
  );
};

export default GitHubButton;
