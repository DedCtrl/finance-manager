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
  if (t.type !== "Expense") return total;
  if (t.date?.slice(0, 7) !== selectedMonth) return total;

  const hasBudget = filteredBudgets.some(
    (b) => b.category.toLowerCase() === t.category.toLowerCase()
  );

  if (!hasBudget) return total;

  return total + (parseFloat(t.amount) || 0);
}, 0);

const remaning = totalBudget - totalSpent

 const progress = totalSpent * 100 / totalBudget

const finalProgress = Number(progress.toFixed(1))

const [progressBarWidth, setprogressBarWidth] = useState(0)
const [progressBarColor, setprogressBarColor] = useState('bg-black')
const progressBar = ()=>{
  if(progress > 100){
setprogressBarWidth(100)
setprogressBarColor('bg-red-600')
  }else{
    setprogressBarWidth(finalProgress)
    setprogressBarColor('bg-black')
  }
}

useEffect(()=>{
  progressBar()
}, [totalSpent, totalBudget])

  return (
    <div className='w-full px-4 md:px-8'>
        <div className='w-full flex flex-col justify-between bg-white border px-4 md:px-6 py-4 border-gray-200 shadow-md rounded-xl gap-4'>
            <div>
              <h4 className='text-[17px] font-semibold'>Overall Budget</h4>
              <p className='text-gray-600 text-sm md:text-base'>Total budget across all categories</p>
            </div>
            <div className='flex justify-between gap-3 md:gap-5 items-center'>
              <div>
                <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Total Budget</h1>
                <h1 className='font-bold text-xl md:text-3xl'>{totalBudget}</h1>
              </div>
              <div>
                <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Spent</h1>
                <h1 className='font-bold text-xl md:text-3xl'>{totalSpent}</h1>
              </div>
              <div>
                <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Remaining</h1>
                <h1 className='font-bold text-xl md:text-3xl'>{remaning}</h1>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 text-sm'>Progress</h1>
                <h1 className='text-gray-500 text-sm'>{finalProgress || 0}%</h1>
              </div>
              <div className='bg-[#CDCCD0] w-full h-3 mt-2 rounded-xl'>
                <div className={`${progressBarColor} h-full rounded-xl`} style={{width:`${progressBarWidth || 0}%`}}></div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default OverallBudget