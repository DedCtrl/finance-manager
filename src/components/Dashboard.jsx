import React from 'react'
import { getAuth } from "firebase/auth";
import app from "../FirebaseConfig";
import Navbar from '../Pages/Navbar';
import DashboardTop from '../Pages/Dashboard/DashboardTop';
import DashboardCards from '../Pages/Dashboard/DashboardCards';
import DashboardGraphs from '../Pages/Dashboard/DashboardGraphs';
const Dashboard = () => {

  return (
    <div className='flex min-h-screen'>
      <Navbar />

      <div className='md:ml-[20%] w-full md:w-[80%] bg-[#F9FAFB] min-h-screen pb-20 md:pb-0'>
        <DashboardTop />
        <DashboardCards />
        <DashboardGraphs />
      </div>
    </div>
  )
}

export default Dashboard