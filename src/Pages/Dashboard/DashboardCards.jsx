import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const DashboardCards = () => {

    const [TotalAmount, setTotalAmount] = useState(0)
  const [SummaryCss, setSummaryCss] = useState('text-green-700')
  const [transactionCount, setTransactionCount] = useState(0)
  const [TotalIncome, setTotalIncome] = useState(0)
  const [TotalExpense, setTotalExpense] = useState(0)
  const [Type, setType] = useState('Surplus')

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

      let totalExpense = 0;
      let totalIncome = 0;



      transactions.forEach((transaction) => {
        if (transaction.type === "Expense") {
          totalExpense += Number(transaction.amount);
            setTotalExpense(totalExpense);
        } else if (transaction.type === "Income") {
          totalIncome += Number(transaction.amount);
          setTotalIncome(totalIncome);
        }
      });

      let balance = totalIncome - totalExpense;
      setTotalAmount(balance);
      

      if(balance < 0){
 
        setType('Deficit')
      }else {
        setType('Surplus')
      }

      setSummaryCss(balance < 0 ? 'text-red-700' : 'text-green-700');
      setTransactionCount(transactions.length);
      setTotalAmount(balance);

    });



    return () => unsubscribeDB(); // cleanup DB listener
  });

  return () => unsubscribeAuth(); // cleanup auth listener
}, []);
  


  return (
    <div className="w-full px-4 md:px-8 py-3 gap-4 md:gap-7 flex flex-col sm:flex-row justify-between items-center">
        <div className='bg-white w-full sm:w-1/3 border border-gray-200 h-full rounded-xl shadow-md px-5 py-5 flex flex-col justify-between ' >
        <div className='flex justify-between items-center '>
            <h1 className='font-semibold text-[16px]'>Total Income</h1>
            <svg className='h-5 w-5 text-green-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="seagreen" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right h-4 w-4 text-green-600" data-fg-btfz12="2.29:2.9092:/src/app/pages/dashboard.tsx:103:13:3571:53:e:ArrowDownRight::::::0e1" data-fgid-btfz12=":ren:"><path d="m7 7 10 10"></path><path d="M17 7v10H7"></path></svg>
        </div>
        <div >
            <h1 className='text-2xl font-bold'>${TotalIncome}</h1>
            <p className='text-[12px] text-gray-500'>Last Month</p>
        </div>
        </div>

        <div className='bg-white w-full sm:w-1/3 border border-gray-200 h-full rounded-xl shadow-md px-5 py-5 flex flex-col justify-between ' >
    <div className='flex justify-between items-center '>
            <h1 className='font-semibold text-[16px]'>Total Expenses</h1>
            <svg className='h-4 w-4 text-red-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-4 w-4 text-red-600" data-fg-btfz23="2.29:2.9092:/src/app/pages/dashboard.tsx:114:13:4069:49:e:ArrowUpRight::::::CDfy" data-fgid-btfz23=":r2p0:"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </div>
        <div >
            <h1 className='text-2xl font-bold'>${TotalExpense}</h1>
            <p className='text-[12px] text-gray-500'>Last Month</p>
        </div>
        </div>

        <div className='bg-white w-full sm:w-1/3 border border-gray-200 h-full rounded-xl shadow-md px-5 py-5 flex flex-col justify-between ' >
    <div className='flex justify-between items-center '>
            <h1 className='font-semibold text-[16px]'>Balance</h1>
           <svg className='h-4 w-4 text-blue-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet h-4 w-4 text-blue-600" data-fg-btfz36="2.29:2.9092:/src/app/pages/dashboard.tsx:127:13:4648:44:e:Wallet::::::ClSR" data-fgid-btfz36=":r2pb:"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
        </div>
        <div >
            <h1 className={`text-2xl font-bold ${SummaryCss}`}>${TotalAmount}</h1>
            <p className='text-[12px] text-gray-500'>{Type}</p>
        </div>
        </div>

    </div>
  )
}

export default DashboardCards