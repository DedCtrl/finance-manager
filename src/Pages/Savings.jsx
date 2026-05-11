import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "./../FirebaseConfig";
import Navbar from './Navbar'
import SavingTop from './Savings/SavingTop'
import SavingCard from './Savings/SavingCard'
import SavingContainer from './Savings/SavingContainer'
import AddSaving from './Savings/AddSaving'
import AddAmountPg from './Savings/AddAmountPg'
import { add } from 'firebase/firestore/pipelines';


const Savings = () => {

  const [addSaving, setAddSaving] = useState(false)
  const [activeGoalId, setActiveGoalId] = useState(null)
  const [Budgets, setBudgets] = useState([])
    const [transactions, setTransactions] = useState([])
    const [Remaining, setRemaining] = useState(0)
    const [TotalBudget, setTotalBudget] = useState(0)
    const [TotalSpent, setTotalSpent] = useState(0)
    const [addAmountTrigger, setaddAmountTrigger] = useState(false)
    const [amountToSave, setAmountToSave] = useState('')
    const [totalSaved, setTotalSaved] = useState(0)


 const date = new Date();
date.setMonth(date.getMonth() - 1);

const prevMonthName = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, '0')}`;




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

  

  useEffect(() => {
  const filteredBudgets = Budgets.filter((budget) => {
    return budget.date === prevMonthName;
  });

  const totalBudget = filteredBudgets.reduce((total, budget) => {
    return total + (parseFloat(budget.amount) || 0);
  }, 0);

  const totalSpent = transactions.reduce((total, t) => {
    if (
      t.type === "Expense" &&
      t.date?.slice(0, 7) === prevMonthName
    ) {
      return total + (parseFloat(t.amount) || 0);
    }

    return total;
  }, 0);

  const remaining = totalBudget - totalSpent - totalSaved; // subtract totalSaved from remaining budget

  setRemaining(remaining);
  setTotalBudget(totalBudget);
  setTotalSpent(totalSpent);

}, [Budgets, transactions, prevMonthName,totalSaved]);


const addPrevMonthSaving = ()=>{
  const user = auth.currentUser;
  const uid = user.uid
        const dbRef = ref(db,`users/${uid}/monthlySavings/${prevMonthName}`)
        set(dbRef,{
            amount:Remaining,
            date:prevMonthName
        })
}

useEffect(() => {
  if (Remaining > 0) {
    addPrevMonthSaving();
  }
}, [Remaining]);





  return (
    <div>
      <Navbar />
      
      {addSaving &&  <AddSaving addSaving={addSaving} setAddSaving={setAddSaving} />}
      {addAmountTrigger &&  <AddAmountPg setaddAmountTrigger={setaddAmountTrigger} Remaining={Remaining}  activeGoalId={activeGoalId} setAmountToSave={setAmountToSave} amountToSave={amountToSave}  /> }
      <div  className='w-[80%]  bg-[#F9FAFB] absolute right-0 '>
      <SavingTop addSaving={addSaving} setAddSaving={setAddSaving} />
      <SavingCard totalSaved={totalSaved} setRemaining={setRemaining} Remaining={Remaining} setTotalBudget={setTotalBudget}
      TotalBudget={TotalBudget} TotalSpent={TotalSpent} setTotalSpent={setTotalSpent} />
      <SavingContainer setAddSaving={setAddSaving} setTotalSaved={setTotalSaved} setaddAmountTrigger={setaddAmountTrigger} activeGoalId={activeGoalId} setActiveGoalId={setActiveGoalId}   addAmountTrigger={addAmountTrigger} setRemaining={setRemaining} Remaining={Remaining} setTotalBudget={setTotalBudget}
      TotalBudget={TotalBudget} TotalSpent={TotalSpent} setTotalSpent={setTotalSpent} />
      </div>
    </div>
  )
}

export default Savings