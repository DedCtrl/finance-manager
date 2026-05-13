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
const [isOnline, setIsOnline] = useState(navigator.onLine)

useEffect(() => {
  window.addEventListener('online', () => setIsOnline(true))
  window.addEventListener('offline', () => setIsOnline(false))
  return () => {
    window.removeEventListener('online', () => setIsOnline(true))
    window.removeEventListener('offline', () => setIsOnline(false))
  }
}, [])

// Show banner anywhere in your UI

  useEffect(() => {
  if (!navigator.onLine) return // stop here if no internet — stays on loading screen

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
    setLoading(false)
  })
  return () => unsubscribe()
}, [])

if (loading) return (
  <div className='h-screen w-full flex flex-col items-center justify-center'>
    <h1 className='text-xl font-semibold mb-4'>Finance Manager</h1>
    
    {!isOnline ? (
      // show this when offline
      <div className='flex flex-col items-center gap-3'>
        <div className='w-64 h-1.5 bg-gray-200 rounded-full'></div> {/* static bar */}
        <div className='bg-red-100 text-red-500 px-4 py-2 rounded-lg text-sm'>
          No internet connection — please reconnect to continue
        </div>
      </div>
    ) : (
      // show this when online and loading
      <div className='w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
        <div className='h-full bg-black rounded-full'
          style={{ animation: 'loading 1s ease-in-out infinite' }}>
        </div>
      </div>
    )}
  </div>
)

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

export default App