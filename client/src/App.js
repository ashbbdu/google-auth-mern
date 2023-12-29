

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './privateRoute';

function App() {
  return (
   <>
    <Nav />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute>
          <Dashboard />
      </PrivateRoute>} />
    </Routes>
   </>
  );
}

export default App;
