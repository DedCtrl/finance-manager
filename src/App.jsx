import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth' // <-- Added getRedirectResult
import { useNavigate } from 'react-router-dom'
import Login from './components/Login'
import SignIn from './components/SignIn'
import { Routes, Route } from 'react-router-dom'
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

  useEffect(() => {
    if (!navigator.onLine) return; // stop here if no internet

    let unsubscribe;

    const checkAuthAndRedirect = async () => {
      try {
        // 1. Wait for Firebase to process the Google redirect FIRST
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Google sign-in redirect error:", error);
      }

      // 2. Now listen for the auth state
      unsubscribe = onAuthStateChanged(auth, (user) => {
        const currentPath = window.location.pathname;

        if (user) {
          // If logged in and on Login/Signup, push to Dashboard
          if (currentPath === '/' || currentPath === '/signup') {
            navigate('/Dashboard'); // Make sure the 'D' is capitalized to match your Route!
          }
        } else {
          // If logged OUT and trying to access private pages, push to Login
          if (currentPath !== '/' && currentPath !== '/signup') {
            navigate('/');
          }
        }
        
        setLoading(false);
      });
    };

    checkAuthAndRedirect();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth, navigate]);

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