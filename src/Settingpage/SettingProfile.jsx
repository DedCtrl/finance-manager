import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "./../FirebaseConfig";
const SettingProfile = () => {
const db = getDatabase(app)
const auth = getAuth()


const user = auth.currentUser;



const [userEmail, setuserEmail] = useState(user.email)
const [userName, setUserName] = useState(user.displayName)
  return (
    <div className="w-full border border-gray-200  shadow-md rounded-3xl px-8 py-6">
  {/* Heading */}
  <div>
    <h2 className="text-lg font-semibold text-black">
      Profile Information
    </h2>

    <p className="text-gray-500 text-lg mt">
      Your account details
    </p>
  </div>

  {/* Top Profile */}
  <div className="flex items-center gap-6 mt-5">
    {/* Avatar */}
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center text-white text-3xl font-medium shrink-0">
    <div>{((userName.charAt(0)).toUpperCase())}</div>
  </div>

    {/* User Info */}
    <div>
      <h3 className="text-xl font-semibold text-black">{userName}</h3>

      <p className="text-xl text-gray-500 mt">
        {userEmail}
      </p>
    </div>
  </div>

  {/* Divider */}
  
</div>
  )
}

export default SettingProfile