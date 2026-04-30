import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
    
import { onAuthStateChanged } from "firebase/auth";
const Summary = ({Search, selectedMonth}) => {

  const [TotalAmount, setTotalAmount] = useState(0)
  const [SummaryCss, setSummaryCss] = useState('text-green-700')
  const [transactionCount, setTransactionCount] = useState(0)
  const [TotalIncome, setTotalIncome] = useState(0)
  const [TotalExpense, setTotalExpense] = useState(0)

  const db = getDatabase(app)
    const auth = getAuth()


useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const dbRef = ref(db, `users/${user.uid}/transactions`);

    const unsubscribeDB = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const allTransactions = Object.values(data);

const transactions = allTransactions.filter((t) => {
  if (!selectedMonth) return true;

  const transactionMonth = new Date(t.date).toISOString().slice(0, 7);
  return transactionMonth === selectedMonth;
});

let totalExpense = 0;
let totalIncome = 0;

transactions.forEach((transaction) => {
  if (transaction.type === "Expense") {
    totalExpense += Number(transaction.amount);
  } else if (transaction.type === "Income") {
    totalIncome += Number(transaction.amount);
  }
});

      let balance = totalIncome - totalExpense;

      


if (Search === "Expense") {
  balance = totalExpense;
  setSummaryCss('text-red-700');
} else if (Search === "Income") {
  balance = totalIncome;
  setSummaryCss('text-green-700');
} else {
  setSummaryCss(balance < 0 ? 'text-red-700' : 'text-green-700');
}
      setTransactionCount(transactions.length);

     

      setTotalAmount(balance);

    });



    return () => unsubscribeDB(); // cleanup DB listener
  });

  return () => unsubscribeAuth(); // cleanup auth listener
}, [Search, selectedMonth]);
  
    
  

console.log(Search)

  return (
    <div className=' h-45 px-8 py-4'>
        <div className='bg-white py-4 shadow-md  rounded-xl border border-gray-200 w-full h-full flex flex-col justify-between  px-6'>
            <h1 className='text-[18px] font-semibold'>Summary</h1>
            <div>
                <h1 className={`font-bold text-[24px] ${SummaryCss}`}>{TotalAmount  >= 0 ? '+' : '-'}{Math.abs(TotalAmount )}</h1>
                <h3 className='text-[14px] text-[#6A7282]'>{transactionCount} transactions</h3>
            </div>
        </div>
    </div>
  )
}

export default Summary