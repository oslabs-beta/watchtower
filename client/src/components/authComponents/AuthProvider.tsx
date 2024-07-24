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

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  console.log('user', user, 'token', token);
  const navigate = useNavigate();

  //add logic for a loginFunction

  const gitHubOAuth = async () => {
    const queryString: string = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log('codeParam', codeParam);

    if (codeParam && !token) {
      await fetch(`/api/gitHub?code=${codeParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((accessToken) => {
          console.log('in gitHubOAuth');
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
          navigate('/dashboard');
          // setRerender(!rerender);
        })
        .catch((err) =>
          console.log(`error getting GitHub Access token from server:${err}`)
        );
    }
  };

  const login = async (data) => {
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

  const logout = () => {
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

// On button click for gh button
// 1. nav user to other page
// 2. invoke login function to get access token from github
