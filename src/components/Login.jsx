import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import app from '../FirebaseConfig';
import { getAuth, signInWithEmailAndPassword,   signInWithRedirect,  signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Dashboard');
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

 const handleGoogleSignIn = async () => {
  setError("");
  try {
    if (isMobile) {
      await signInWithRedirect(auth, provider);
      // page redirects to Google, then comes back
    } else {
      await signInWithPopup(auth, provider);
      navigate('/Dashboard');
    }
  } catch (error) {
    setError("Google sign-in failed. Please try again.");
  }
};

useEffect(() => {
  getRedirectResult(auth).then((result) => {
    if (result?.user) {
      navigate('/Dashboard');
    }
  }).catch((error) => {
    setError("Google sign-in failed. Please try again.");
  });
}, []);
  return (
    <div className='min-h-screen w-screen flex items-center flex-col justify-center bg-[#F7FAFF] px-4 py-8'>
      <div className='text-3xl md:text-4xl font-bold bg-linear-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        Finance Manager
      </div>

      <div className='w-full max-w-md mt-3'>
        {/* Tab switcher */}
        <div className='flex bg-[#ECECF0] p-2 items-center rounded-2xl cursor-pointer'>
          <div className='bg-white rounded-2xl w-1/2 flex font-medium items-center justify-center py-1'>
            <Link to="/">Login</Link>
          </div>
          <div className='w-1/2 flex items-center justify-center font-medium py-1'>
            <Link to="/signup">Signup</Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={login} className='bg-white border border-gray-300 rounded-lg p-4 mt-4 flex flex-col gap-4'>
          <div className='mt-2'>
            <h2 className='font-medium'>Welcome Back</h2>
            <h4 className='text-[#717182] text-sm'>Enter your credentials to access your account</h4>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="Email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              className='bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm'
              type='email'
              id="Email"
              placeholder='Enter your Email'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className='bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm'
              type="password"
              placeholder='Enter your password'
              id="password"
            />
          </div>

          {error && (
            <p className="text-red-500 bg-gray-100 p-1 rounded text-sm">{error}</p>
          )}

          <button className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800'>
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login