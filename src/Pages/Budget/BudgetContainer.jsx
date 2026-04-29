import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "../../FirebaseConfig";

const BudgetContainer = ({selectedMonth}) => {

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

    const getSpent =(category, month)=>{
        return transactions.reduce((total, transaction) => {
          const transactionCategory = transaction.category === category && transaction.type === "Expense" 
          const transactionMonth = !month || transaction.date?.slice(0, 7) === month
          if (transactionCategory && transactionMonth  ) {
            return total + parseFloat(transaction.amount || 0);
          }
          return total;
        }, 0);

      }

      const handleDelete =(id)=>{
        const user = auth.currentUser;
        const uid = user.uid
        const dbRef = ref(db, `users/${uid}/budgets/${id}`);
        remove(dbRef)
      }


     let filteredBudgets = Budgets;

if (selectedMonth !== "") {
  filteredBudgets = Budgets.filter(function(budget) {
    return budget.date === selectedMonth;
  });
}


  return (
    <div className='px-8 mt-8 w-full h-auto'>
        <div className=' min-h-80 w-full  py-5 '>
            <h1 className='font-semibold text-xl'>Budgets</h1>
            <div className=' h-70 w-full py-5 '>


            {filteredBudgets.map((budget)=>{
              const spent = getSpent(budget.category, budget.date);
  const remaining = budget.amount - spent;
  const progress = spent * 100 / budget.amount 
  console.log(progress);
  
              return(
              <div className='bg-white mb-5 h-50 flex justify-between flex-col w-full border border-gray-200 rounded px-5 py-4 shadow-md  '>
                <div className='flex justify-between  items-center'>
                  <div className='flex items-centre justify-center'>
                  <div className='w-12 h-12 bg-blue-300 rounded-full flex justify-center items-center'>
                    <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
                  </div>
                  <h1 className='px-3 py-3 font-semibold text-[16px]'>{budget.category.charAt(0).toUpperCase() + budget.category.slice(1)}</h1>
                  </div>
                 
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(budget.id)}>
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
      </button>


                </div>
                <div className='flex justify-between mt-4  gap-5 items-center'>
    <div className=' h-17'>
    <h1 className='text-gray-500 text-[15px]'>Total Budget</h1>
    <h1 className='font-bold text-xl'>{budget.amount}</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Spent</h1>
    <h1 className='font-bold text-blue-500 text-xl'>{spent}</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Remaining</h1>
    <h1 className='font-bold text-xl'>{remaining}</h1>
    </div>
            </div>
            
            <div className='w-full h-15 '>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 text-sm'>Progress</h1>
                <h1 className='text-gray-500 text-sm'>{progress}%</h1>
                </div>
                <div className='bg-[#CDCCD0] w-full h-2 mt-2 rounded-xl'>
                  <div className='bg-black h-full   rounded-xl ' style={{width:`${progress}%`}}></div>
                </div>
            </div>



              </div>)
            })}


              
            </div>
        </div>
    </div>
  )
}

export default BudgetContainer