import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "../../FirebaseConfig";

const OverallBudget = ({selectedMonth}) => {

const [Budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])

     const db = getDatabase(app)
    const auth = getAuth()

    useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const dbRef = ref(db, `users/${user.uid}/budgets`);

    const unsubscribeDB = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setBudgets([]);
        return;
      }

      const budgets = Object.entries(data).map(([id, value]) => ({
        id,
        ...value
      }));

      setBudgets(budgets);
    });

    return () => unsubscribeDB();
  });

  return () => unsubscribeAuth();
}, []);


useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const dbRef = ref(db, `users/${user.uid}/transactions`);

    const unsubscribeDB = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setTransactions([]);
        return;
      }
      const transactions = Object.entries(data).map(([id, value]) => ({
        id,
        ...value
      }));
      setTransactions(transactions);

      
      
    });



    return () => unsubscribeDB();
  });

  return () => unsubscribeAuth();
},[])





let filteredBudgets = Budgets;

if (selectedMonth !== "") {
  filteredBudgets = Budgets.filter(function(budget) {
    return budget.date === selectedMonth;
  });
}

const totalBudget = filteredBudgets.reduce((total , budget) =>{
  return total + (parseFloat(budget.amount) || 0)
}, 0)

const totalSpent = transactions.reduce((total, t) => {
  if (
    t.type === "Expense" &&
    t.date?.slice(0, 7) === selectedMonth
  ) {
    return total + (parseFloat(t.amount) || 0);
  }
  return total;
}, 0);

const remaning = totalBudget - totalSpent

  return (
    <div className='w-full h-70 px-8 '>
        <div className='w-full h-full flex flex-col justify-between  bg-white border px-6 py-4 border-gray-200 shadow-md rounded-xl '>
            <div>
            <h4 className='text-[17px] font-semibold'>Overall Budget</h4>
            <p className='text-gray-600'>Total budget across all categories</p>
            </div>
            <div className='flex justify-between gap-5 items-center'>
    <div className=' h-20'>
    <h1 className='text-gray-500 text-[15px]'>Total Budget</h1>
    <h1 className='font-bold text-3xl'>{totalBudget}</h1>
    </div>
    <div className=' h-20 '>
    <h1 className='text-gray-500 text-[15px]'>Spent</h1>
    <h1 className='font-bold text-3xl'>{totalSpent}</h1>
    </div>
    <div className=' h-20 '>
    <h1 className='text-gray-500 text-[15px]'>Remaining</h1>
    <h1 className='font-bold text-3xl'>{remaning}</h1>
    </div>
            </div>
            <div className='w-full h-15 '>
                <h1 className='text-gray-500 text-sm'>Progress</h1>
            </div>
        </div>
    </div>
  )
}

export default OverallBudget