import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import app from "./../FirebaseConfig";

const SettingProfile = () => {
  const auth = getAuth(app)
  const user = auth.currentUser;

  const [userEmail] = useState(user.email)
  const [userName] = useState(user.displayName)

  return (
    <div className="w-full border border-gray-200 shadow-md rounded-2xl px-4 sm:px-6 md:px-8 py-6 mt-4">
      {/* Heading */}
      <div>
        <h2 className="text-lg font-semibold text-black">Profile Information</h2>
        <p className="text-gray-500 text-sm mt-1">Your account details</p>
      </div>

      {/* Top Profile */}
      <div className="flex items-center gap-4 mt-5">
        {/* Avatar */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center text-white text-2xl sm:text-3xl font-medium shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h3 className="text-base sm:text-xl font-semibold text-black truncate">{userName}</h3>
          <p className="text-sm sm:text-base text-gray-500 mt-0.5 truncate">{userEmail}</p>
        </div>
      </div>
    </div>
  )
}

export default SettingProfile