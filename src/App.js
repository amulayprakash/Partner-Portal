import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import './App.scss';
import HomePage from './Components/HomePage';
import AddDocument from './Components/AddDocument';
import AddQr from './Components/AddQr';
import AddGroup from './Components/AddGroup';
import AddCustomer from './Components/AddCustomer'

function App() {
  return (
    <div className="app">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login /> } />
          <Route path="/:id/addoc" element={<AddDocument/> } />
          <Route path="/:id/addqr"  element={<AddQr />} />
          <Route path="/addgroup"  element={<AddGroup />} />
        </Routes>

    </div>
  );
}

export default App;
