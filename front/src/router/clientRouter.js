import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Employees from '../pages/Employees/Employees';
import Managers from '../pages/Managers/Managers';
import OsEmployees from '../pages/OsEmployees/OsEmployees';

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/managers' element={<Managers />} />
        <Route path='os-employees' element={<OsEmployees />} />
      </Routes>
    </Router>
  )
}

export default ClientRouter