

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';

function App() {
  return (
   <>
    <Nav />
     <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
   </>
  );
}

export default App;
