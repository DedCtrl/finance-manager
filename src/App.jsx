import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Login from './components/Login'
import SignIn from './components/SignIn'
import { initializeApp } from "firebase/app";
import { Routes, Route } from 'react-router-dom'
import { getDatabase } from "firebase/database";
import Dashboard from './components/Dashboard';
import Savings from './Pages/Savings';
import Budget from './Pages/Budget';
import Setting from './Pages/Setting';
import Expenses from './Pages/Expenses';


const App = () => {
const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const navigate = useNavigate()

  const App = () => {
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard') // already logged in → skip login page
      } else {
        navigate('/login')     // not logged in → go to login
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <div>Loading...</div> // prevent flash of login page

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Savings' element={<Savings/>} />
        <Route path='/Budget' element={<Budget />} />
        <Route path='/Settings' element={<Setting />} />
        <Route path='/Transactions' element={<Expenses />} />
      </Routes>
    </div>
  )
};
}
export default App