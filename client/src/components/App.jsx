import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import NavBar from './NavBar.jsx';
import AWSInfoPage from './AWSInfoPage.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function App() {
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
