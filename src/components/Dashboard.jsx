import React from 'react'
import { getAuth } from "firebase/auth";
import app from "../FirebaseConfig";
import Navbar from '../Pages/Navbar';
import DashboardTop from '../Pages/Dashboard/DashboardTop';
import DashboardCards from '../Pages/Dashboard/DashboardCards';
import DashboardGraphs from '../Pages/Dashboard/DashboardGraphs';
const Dashboard = () => {

  return (
    <div className='flex '>
      <Navbar />

      <div className='w-[80%]  bg-[#F9FAFB] absolute right-0 overflow-y-hidden '>
        <DashboardTop />
        <DashboardCards />
        <DashboardGraphs />
      </div>
    </div>
  )
}

export default Dashboard