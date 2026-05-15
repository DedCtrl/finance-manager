import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword, // (or createUserWithEmailAndPassword in SignIn)
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult // <--- Add this
} from "firebase/auth";

import app from "../FirebaseConfig";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userCreated, setUserCreated] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(
    navigator.userAgent
  );

  useEffect(() => {
    let unsubscribe;

    const checkRedirectAndAuthState = async () => {
      try {
        // 1. Wait for Firebase to process the redirect FIRST
        // On desktop (popup), this instantly resolves to null.
        await getRedirectResult(auth);
      } catch (err) {
        setError("Google sign-in failed during redirect.");
        setLoading(false);
      }

      // 2. Now it's safe to listen to the auth state
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/Dashboard");
        } else {
          // Only stop the loading animation if we are absolutely sure there is no user
          setLoading(false);
        }
      });
    };

    checkRedirectAndAuthState();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    setError("");

    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const signIn = async () => {
    setError("");
    setUserCreated("");

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await userCredential.user.reload();

      setUserCreated("User created successfully!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError(
          "Email already in use. Please login or use a different email."
        );
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        setError(
          "Password should be at least 6 characters."
        );
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F7FAFF]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

          <p className="text-gray-500 text-sm">
            Signing you in...
          </p>

          <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full animate-pulse w-1/2"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center flex-col justify-center bg-[#F7FAFF] px-4 py-8">
      <div className="text-3xl md:text-4xl font-bold bg-linear-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Finance Manager
      </div>

      <div className="w-full max-w-md mt-4">
        <div className="flex bg-[#ECECF0] p-2 items-center rounded-2xl">
          <div className="w-1/2 flex font-medium items-center justify-center py-1">
            <Link to="/">Login</Link>
          </div>

          <div className="w-1/2 flex items-center justify-center font-medium bg-white rounded-2xl py-1">
            <Link to="/signup">Signup</Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded-lg p-4 mt-4 flex flex-col gap-4"
        >
          <div className="mt-2">
            <h2 className="font-medium">
              Create an account
            </h2>

            <h4 className="text-[#717182] text-sm">
              Enter your details to get started
            </h4>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-medium"
              htmlFor="Name"
            >
              Full Name
            </label>

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
            <label
              className="font-medium"
              htmlFor="Email"
            >
              Email
            </label>

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
            <label
              className="font-medium"
              htmlFor="password"
            >
              Password
            </label>

            <input
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="bg-[#F3F3F5] p-2 rounded-lg outline-none text-sm"
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>

          {error && (
            <p className="text-red-500 bg-gray-100 p-2 rounded text-sm">
              {error}
            </p>
          )}

          {userCreated && (
            <p className="text-green-500 bg-gray-100 p-2 rounded text-sm">
              {userCreated}
            </p>
          )}

          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition">
            Signup
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-gray-400 text-xs">
              or
            </span>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

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