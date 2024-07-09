import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AWSInfoPage from './AWSInfoPage';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/accountInfo' element={<AWSInfoPage />} />

        {/* <Route path='/analyze' element={<Analyze />} />
        <Route path='/pastAnalyses' element={<PastAnalyses />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
