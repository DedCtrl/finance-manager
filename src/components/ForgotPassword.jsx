import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../FirebaseConfig';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(app);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your inbox.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center flex-col justify-center bg-[#F7FAFF] px-4 py-8'>
      <div className='text-3xl md:text-4xl font-bold bg-gradient-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        Finance Manager
      </div>

      <div className='w-full max-w-md mt-3'>
        <form onSubmit={handleResetPassword} className='bg-white border border-gray-300 rounded-lg p-4 mt-4 flex flex-col gap-4'>
          <div className='mt-2'>
            <h2 className='font-medium'>Reset Password</h2>
            <h4 className='text-[#717182] text-sm'>Enter your email to receive a reset link</h4>
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

          {error && <p className="text-red-500 bg-gray-100 p-1 rounded text-sm">{error}</p>}
          {message && <p className="text-green-500 bg-gray-100 p-1 rounded text-sm">{message}</p>}

          <button className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 mt-2'>
            Send Reset Link
          </button>

          <div className="flex items-center justify-center mt-2">
            <Link to="/" className="text-sm text-blue-600 hover:underline font-medium">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;