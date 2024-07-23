import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AWSInfoPage from './AWSInfoPage';
import Login from './Login';
import Signup from './Signup';
import Reports from './Reports';
import Integrations from './Integrations';
import AuthProvider from './authComponents/AuthProvider';
import PrivateRoute from './authComponents/PrivateRoute';
// import Layout from './Layout';
// import LandingPage from './landingPage/LandingPage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/accountInfo' element={<AWSInfoPage />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/integrations' element={<Integrations />} />
            <Route
              path='/reports/today'
              element={<Reports timeFrame='today' />}
            />
            <Route
              path='/reports/this-week'
              element={<Reports timeFrame='this week' />}
            />
            <Route
              path='/reports/this-month'
              element={<Reports timeFrame='this month' />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
