import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
const DashboardGraphs = () => {
const [chartData, setChartData] = useState([]);

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
    <div className='w-full h-80 flex items-center justify-center gap-10 px-8 py-3'>
      <div className='bg-white border border-gray-200 shadow-md rounded  w-full h-full'></div>
      <div className='bg-white border border-gray-200 shadow-md rounded  w-full h-full flex items-center justify-center'>
        <PieChart width={450} height={450}>
  <Pie
    data={chartData}
    dataKey="value"
    outerRadius={100}
    label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  } // 👈 shows category name
  >
    {chartData.map((entry, index) => (
      <Cell key={index} fill={["#22c55e", "#3b82f6", "#f59e0b"][index % 3]} />
    ))}
  </Pie>
</PieChart>
      </div>
    </div> )

}
export default DashboardGraphs