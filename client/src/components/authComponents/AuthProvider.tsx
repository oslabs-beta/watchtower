import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Creating AuthContext Provider for use accross the app.
type AuthType = {
  user: string;
  token: string;
  logOut(): void;
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();

  //add logic for a loginFunction

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  //return Auth Context Provider
  return (
    <AuthContext.Provider value={{ user, token, logOut }}>
      //add logIn later
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
