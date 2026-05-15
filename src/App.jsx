import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Savings from './Pages/Savings';
import Budget from './Pages/Budget';
import Setting from './Pages/Setting';
import Expenses from './Pages/Expenses';

const App = () => {
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!navigator.onLine) return; // Stop here if no internet

    let unsubscribe;

    const checkAuthAndRedirect = async () => {
      try {
        // Catch any leftover redirects from previous attempts
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Google sign-in redirect error:", error);
      }

      // App.js is now the ONLY file that listens for user state
      unsubscribe = onAuthStateChanged(auth, (user) => {
        const currentPath = window.location.pathname;

        if (user) {
          // If logged in and on Login/Signup, push to Dashboard
          if (currentPath === '/' || currentPath === '/signup') {
            navigate('/Dashboard');
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
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[#F7FAFF]'>
      <h1 className='text-3xl font-bold bg-gradient-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
        Finance Manager
      </h1>
      
      {!isOnline ? (
        <div className='flex flex-col items-center gap-3'>
          <div className='w-64 h-1.5 bg-gray-200 rounded-full'></div>
          <div className='bg-red-100 text-red-500 px-4 py-2 rounded-lg text-sm'>
            No internet connection — please reconnect to continue
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-3'>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Savings' element={<Savings />} />
        <Route path='/Budget' element={<Budget />} />
        <Route path='/Settings' element={<Setting />} />
        <Route path='/Transactions' element={<Expenses />} />
      </Routes>
    </div>
  );
};

export default App;