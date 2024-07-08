import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import NavBar from './NavBar.jsx';
import AWSInfoPage from './AWSInfoPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/accountInfo' element={<AWSInfoPage />} />
        {/* <Route path='/analyze' element={<Analyze />} />
        <Route path='/pastAnalyses' element={<PastAnalyses />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
