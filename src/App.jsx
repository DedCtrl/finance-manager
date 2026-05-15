import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom' // <-- Added useLocation
import Login from './components/Login'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard';
import Savings from './Pages/Savings';
import Budget from './Pages/Budget';
import Setting from './Pages/Setting';
import Expenses from './Pages/Expenses';

const App = () => {
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const navigate = useNavigate()
  const location = useLocation() // <-- Initialize location here
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Handle Online/Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, [])

  // Handle Authentication and Routing
  useEffect(() => {
    if (!navigator.onLine) return; // stop here if no internet

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 👇 Use React Router's location instead of window.location
      // This ignores the Vite base path and just looks at the actual route!
      const currentPath = location.pathname;

      if (user) {
        // If logged in and on Login/Signup, push to Dashboard
        if (currentPath === '/' || currentPath === '/signup') {
          navigate('/Dashboard'); 
        }
      } else {
        // If logged out and trying to peek at a private page, kick back to Login
        if (currentPath !== '/' && currentPath !== '/signup') {
          navigate('/');
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate, location.pathname]) // <-- Added location.pathname to dependencies

  // Loading Screen
  if (loading) return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <h1 className='text-xl font-semibold mb-4'>Finance Manager</h1>
      {!isOnline ? (
        <div className='flex flex-col items-center gap-3'>
          <div className='w-64 h-1.5 bg-gray-200 rounded-full'></div>
          <div className='bg-red-100 text-red-500 px-4 py-2 rounded-lg text-sm'>
            No internet connection — please reconnect to continue
          </div>
        </div>
      ) : (
        <div className='w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
          <div className='h-full bg-black rounded-full'
            style={{ animation: 'loading 1s ease-in-out infinite' }}>
          </div>
        </div>
      )}
    </div>
  )

  // Routes
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

export default App;