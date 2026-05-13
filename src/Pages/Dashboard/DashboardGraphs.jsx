import React, { useEffect, useState, useRef } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
const DashboardGraphs = () => {
const [chartData, setChartData] = useState([]);
const [incomeData, setincomeData] = useState([])
  const db = getDatabase(app)
    const auth = getAuth()

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const dbRef = ref(db, `users/${user.uid}/transactions`);

    const unsubscribeDB = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const transactions = Object.values(data);
const categoryData = {};
      transactions.forEach((t) => {
  if (t.type === "Expense") {
    categoryData[t.category] = 
      (categoryData[t.category] || 0) + Number(t.amount);
  }
});

const incomeCategoryData = {};
transactions.forEach((t) => {
  if (t.type === "Income") {
    incomeCategoryData[t.category] = 
      (incomeCategoryData[t.category] || 0) + Number(t.amount);
  }
});

const incomeData = Object.entries(incomeCategoryData).map(([key, value]) => ({
  name: key,
  value
}));
setincomeData(incomeData);

const chartData = Object.entries(categoryData).map(([key, value]) => ({
  name: key,
  value
}));
   setChartData(chartData);


    });



    return () => unsubscribeDB(); // cleanup DB listener
  });

  return () => unsubscribeAuth(); // cleanup auth listener
}, []);

  
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4 md:px-8 py-3'>
      <div className='bg-white w-full md:w-1/2 border flex justify-center items-center border-gray-200 shadow-md rounded h-64 md:h-80'>
      
      {incomeData.length > 0 &&(
<PieChart  width={300} height={250}>
  <Pie
    data={incomeData}
    dataKey="value"
    outerRadius={90}
    label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
  >
    {incomeData.map((entry, index) => (
      <Cell key={index} fill={["#22c55e", "#3b82f6", "#f59e0b"][index % 3]} />
    ))}
  </Pie>
</PieChart>
)}

{incomeData.length === 0 && (
  <div className='flex justify-center items-center w-full h-full '>
                <div  className='font-semibold text-lg py-2'>No Income Data Found.</div>
               

            </div>
  )}
      
      </div>


      <div className='bg-white border border-gray-200 shadow-md rounded w-full md:w-1/2 h-64 md:h-80 flex items-center justify-center'>

{chartData.length > 0 &&(
<PieChart width={300} height={250}>
  <Pie
    data={chartData}
    dataKey="value"
    outerRadius={90}
    label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
  >
    {chartData.map((entry, index) => (
      <Cell key={index} fill={["#22c55e", "#3b82f6", "#f59e0b"][index % 3]} />
    ))}
  </Pie>
</PieChart>
)}

{chartData.length === 0 && (
  <div className='flex justify-center items-center w-full h-full '>
                <div  className='font-semibold text-lg py-2'>No Expense Data Found.</div>
               

            </div>
  )}
         
        
      </div>
    </div> )

}
export default DashboardGraphs