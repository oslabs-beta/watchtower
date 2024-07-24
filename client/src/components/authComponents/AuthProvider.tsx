import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

// Creating AuthContext Provider for use accross the app.
type AuthType = {
  user: string;
  setUser: any;
  token: string;
  setToken: any;
  login: any;
  logout(): void;
  gitHubOAuth(): void;
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [token, setToken] = useState(localStorage.getItem('accessToken' || ''));

  const navigate = useNavigate();

  const gitHubOAuth = async (): Promise<void> => {
    const queryString: string = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if (codeParam && !token) {
      await fetch(`/api/gitHub?code=${codeParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((accessToken) => {
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
          navigate('/dashboard');
        })
        .catch((err) =>
          console.log(`error getting GitHub Access token from server:${err}`)
        );
    }
  };

  const login = async (data): Promise<void> => {
    fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem('accessToken', user.accessToken);
        setToken(user.accessToken);
        setUser(user.firstName);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(`error validating user: ${err}. Please sign in again`);
        navigate('/');
      });
  };

  const logout = (): void => {
    setUser('');
    setToken('');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const contextValue: AuthType | null = {
    user,
    setUser,
    token,
    setToken,
    login: login,
    logout,
    gitHubOAuth,
  };

  //return Auth Context Provider
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
