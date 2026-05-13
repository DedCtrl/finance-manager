import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import app from  '../FirebaseConfig';
import { getDatabase,ref ,push ,set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    

    const redirect = useNavigate();

     const auth = getAuth(app);
    const login =()=>{
        signInWithEmailAndPassword(auth,email ,password).then(()=>{
            redirect('/Dashboard');
        }).catch((error)=>{
            alert("Error logging in: " + error);
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        // Handle login logic here
    }


  return (
    <div className='min-h-screen w-screen flex items-center flex-col justify-center bg-[#F7FAFF] px-4 py-8'>
        <div className='text-3xl md:text-4xl font-bold bg-linear-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent'>Finance Manager</div>
        <div className='w-full max-w-md mt-3'>
            <div className='flex bg-[#ECECF0] p-2 items-center rounded-2xl cursor-pointer'>
                <div className='bg-white rounded-2xl w-1/2 flex font-medium items-center justify-center py-1'><Link to="/">Login</Link></div>
                <div className='w-1/2 flex items-center justify-center font-medium py-1'><Link to="/signup">Signup</Link></div>
            </div>
            <form action="" onSubmit={(e) => {
            handleSubmit(e);
            login();
          }} className='bg-white border border-gray-300 rounded-lg p-4 mt-4 flex justify-between flex-col gap-4'>
                <div className='mt-2'>
                    <h2 className='font-medium'>Welcome Back</h2>
                    <h4 className='text-[#717182] text-sm'>Enter your credentials to access your account</h4>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium' htmlFor="Email">Email</label>
                    <input
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required className='bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm' type='Email' id="Email" placeholder='Enter your Email' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium' htmlFor="password">Password</label>
                    <input
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required className='bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm' type="password" placeholder='Enter your password' id="password" />
                </div>
                <button className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login