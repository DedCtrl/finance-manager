import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile,signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../FirebaseConfig";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userCreated, setUserCreated] = useState("");

  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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

  const signIn = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await userCredential.user.reload();
      setUserCreated("User created successfully!");
      navigate("/Dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please login or use a different email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
  };

  return (
    <div className="min-h-screen w-full flex items-center flex-col justify-center bg-[#F7FAFF] px-4 py-8">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Finance Manager
      </div>

      <div className="w-full max-w-md">
        {/* Tab switcher */}
        <div className="flex bg-[#ECECF0] p-2 items-center rounded-2xl cursor-pointer">
          <div className="w-1/2 flex font-medium items-center justify-center py-1">
            <Link to="/">Login</Link>
          </div>
          <div className="w-1/2 flex items-center justify-center font-medium bg-white rounded-2xl py-1">
            <Link to="/signup">Signup</Link>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded-lg p-4 mt-4 flex flex-col gap-4"
        >
          <div className="mt-2">
            <h2 className="font-medium">Create an account</h2>
            <h4 className="text-[#717182] text-sm">Enter your details to get started</h4>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="Name">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm"
              type="text"
              id="Name"
              placeholder="Enter your Full Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="Email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm"
              type="email"
              id="Email"
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm"
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>

          {error && <p className="text-red-500 bg-gray-100 p-0.5 rounded text-sm">{error}</p>}
          {userCreated && <p className="text-green-500 bg-gray-100 p-0.5 rounded text-sm">{userCreated}</p>}

          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
            Signup
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google button — inside the card */}
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
  );
};

export default SignIn;