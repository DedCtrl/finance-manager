import React from 'react'
import Login from './components/Login'
import SignIn from './components/SignIn'
import { initializeApp } from "firebase/app";
import { Routes, Route } from 'react-router-dom'
import { getDatabase } from "firebase/database";
import Dashboard from './components/Dashboard';
import Analytics from './Pages/Analytics';
import Budget from './Pages/Budget';
import Setting from './Pages/Setting';
import Expenses from './Pages/Expenses';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Analytics' element={<Analytics/>} />
        <Route path='/Budget' element={<Budget />} />
        <Route path='/Settings' element={<Setting />} />
        <Route path='/Expenses' element={<Expenses />} />
      </Routes>
    </div>
  )
}

export default App