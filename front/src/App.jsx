import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import CreateRequest from './pages/CreateRequest.jsx';
import UserManagement from './pages/userManagement.jsx';
import UserRequests from './pages/UserRequests.jsx';
import Test1 from './pages/Test1.jsx';


function App() {
  return (
    <BrowserRouter>
      {/* <header>
        <NavLinks /> {/* Use the NavLinks component here 
      </header> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createRequest' element={<CreateRequest />} />
        <Route path='/userManagement' element={<UserManagement />} />
        <Route path='/userRequests' element={<UserRequests />} />
        <Route path='/home' element={<Test1 />} />
        {/* <Route path='/update/:id' element={<Update />} /> */}
        {/*<Route path='/create' element={<Create />} />  {/* Updated route path */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
