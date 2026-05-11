import React from "react";
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Dashboard from "../components/Dashboard";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
const auth = getAuth();
const navigate = useNavigate();

const handleSignOut = () => {
  signOut(auth).then(() => {
    navigate('/') // redirect after sign out
  })
}
  const navItem = ({ isActive }) =>
  `flex gap-3 items-center p-1 rounded cursor-pointer ${
    isActive ? "text-blue-700 bg-blue-100" : "text-[#364153]"
  }`;
  return (
    <div className="w-[20%] h-screen px-4 py-4 fixed bg-white border border-gray-300 shadow-md flex flex-col justify-between" >
      <div>
      <div className="text-2xl h-[10%] font-bold bg-linear-to-r py-1 from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Finance Manager
      </div>


      <div className="flex flex-col justify-between gap-7 mt-10 text-lg font-medium ">
       <NavLink to="/dashboard" className={navItem} end>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/transactions" className={navItem}>
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
  <path d="M12 17.5v-11"></path>
</svg>
        <span>Transactions</span>
      </NavLink>

    
      <NavLink to="/budget" className={navItem}>
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet w-5 h-5" data-fg-ujl3="2.26:2.6924:/src/app/pages/layout.tsx:63:13:1995:33:e:item.icon" data-fgid-ujl3=":r7h:"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
        <span>Budget</span>
      </NavLink>
      <NavLink to="/savings" className={navItem}>
      <svg className="w-5.5 h-5.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-piggy-bank w-5 h-5" data-fg-ujl3="2.26:2.6924:/src/app/pages/layout.tsx:65:13:2066:33:e:item.icon" data-fgid-ujl3=":r4gp:"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"></path><path d="M2 9v1c0 1.1.9 2 2 2h1"></path><path d="M16 11h.01"></path></svg>
        <span>Savings</span>
      </NavLink>

      <NavLink to="/settings" className={navItem}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>Settings</span>
      </NavLink>

      </div>
</div>
    <div onClick={handleSignOut} className="px-4  py-4 bg-red-400 rounded-xl cursor-pointer border-gray-300  border hover:bg-red-500">
      <div className="text-white font-bold flex items-center gap-4 "> <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>Sign Out</div>
    </div>


    </div>
  );
};

export default Navbar;
