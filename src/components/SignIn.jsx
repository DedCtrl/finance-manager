import React, { useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { getDatabase, ref, push, set } from "firebase/database";
import app from "../FirebaseConfig";
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userCreated, setUserCreated] = useState('');

  // const saveData = ()=>{
  //     const db = getDatabase(app);
  //     const newDocRef = push(ref(db, 'usersData/users'));
  //     set(newDocRef, {
  //         name: name,
  //         email: email,
  //         password: password
  //     }).then(() => {
  //         alert("Data saved successfully!");
  //     }).catch((error) => {
  //         alert("Error saving data: " + error);
  //     });
  // }


    const auth = getAuth(app);
    const signIn = () => {
        createUserWithEmailAndPassword(auth, 
            email,
            password
        ).then(()=>{
           setUserCreated('User created successfully! Please login to continue.')
        }).catch((error)=>{
            if(error.code === 'auth/email-already-in-use'){
                setError('Email already in use. Please login or use a different email.')
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email format. Please enter a valid email address.')
            } else if (error.code === 'auth/weak-password') {
                setError('Weak password. Password should be at least 6 characters long.')
            }
        })
    }
        

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    // Handle login logic here
  };
  return (
    <div className="h-screen w-full flex items-center flex-col justify-center bg-[#F7FAFF]">
      <div className="text-4xl font-bold bg-linear-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Finance Manager
      </div>
      <div className="w-125 h-125  rounded-lg p-4 ">
        <div className="flex  bg-[#ECECF0] p-2 items-center rounded-2xl cursor-pointer">
          <div className=" w-1/2 flex font-medium items-center justify-center ">
            <Link to="/">Login</Link>
          </div>
          <div className="w-1/2 flex items-center justify-center font-medium bg-white rounded-2xl">
            <Link to="/signup">Signup</Link>
          </div>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
            signIn();
          }}
          className="  bg-white border h-full border-gray-300 rounded-lg p-4 mt-4 flex justify-between flex-col gap-4"
        >
          <div className="mt-2">
            <h2 className="font-medium">Create an account</h2>
            <h4 className="text-[#717182]">
              Enter your details to get started
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="Name">
              Full Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none"
              type="text"
              id="Name"
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="Email">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none"
              type="Email"
              id="Email"
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none"
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>
          <div>
            {error && <p className="text-red-500 bg-gray-100 p-0.5 rounded ">{error}</p>}
            {userCreated && <p className="text-green-500 bg-gray-100 p-0.5 rounded my-0.5">{userCreated}</p>}
          </div>
          <button  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
            Signup
          </button>
        </form>

      </div>
    </div>
  );
};

export default SignIn;
