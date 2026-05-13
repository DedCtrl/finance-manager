import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "../../FirebaseConfig";

const Transactions = ({ setIsOpen, Search , setSelectedMonth , selectedMonth, typeFilter, categoryFilter }) => {
const [amountCss, setAmountCss] = useState('text-green-500')
const [logo, setLogo] = useState('💰')
const [sign, setSign] = useState('-')
const [transaction, setTransaction] = useState([])

  const db = getDatabase(app)
  const auth = getAuth()

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;
     const dbRef = ref(db, `users/${user.uid}/transactions`);

    const unsubscribeDB = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data){
        setTransaction([]);
       return;
      }
      const transactions = Object.entries(data).map(([id, value]) => ({
  id,
  ...value

}));
      
      setTransaction(transactions)

  })
})
 },[]);

const handleDelete =(id)=>{
  const user = auth.currentUser;
  const uid = user.uid
  const dbRef = ref(db, `users/${uid}/transactions/${id}`);
  remove(dbRef)
}


const transactionFilter = transaction.filter((t) => {
  const matchesSearch = Search
    ? t.description.toLowerCase().includes(Search.toLowerCase()) ||
      t.category.toLowerCase().includes(Search.toLowerCase())
    : true;

  const matchesType = typeFilter ? t.type === typeFilter : true;

  const matchesCategory = categoryFilter
    ? t.category.toLowerCase() === categoryFilter.toLowerCase()
    : true;

  const transactionMonth = t.date?.slice(0, 7);
  const matchesMonth = selectedMonth ? transactionMonth === selectedMonth : true;

  return matchesSearch && matchesType && matchesCategory && matchesMonth;
});

const formatAmount = (amount) => {
  const abs = Math.abs(amount)
  if(abs >=  1000000000) return `${(abs / 1000000000).toFixed(2)}B`
  if (abs >= 10000000) return `${(abs / 10000000).toFixed(2)}Cr`
  if (abs >= 100000) return `${(abs / 100000).toFixed(2)}L`
  return abs.toLocaleString('en-IN') // formats 10000 as 10,000
}


  return (
    <div className='bg-white min-h-90 mx-4 md:mx-8 px-4 md:px-8 py-4 shadow-md rounded-xl border border-gray-200 h-full flex flex-col'>
        <h1 className='text-[18px] font-semibold'>Transactions</h1>

        <div className="mt-5 w-full min-h-90 rounded-md py-5">

{transactionFilter.length === 0 &&(
  <div className='flex items-center justify-center flex-col' >
<div className='font-semibold text-lg py-3'>No transactions found.</div>
<div onClick={() => { setIsOpen(true) }} 
      className="text-white cursor-pointer bg-black flex justify-center items-center px-3 py-2 rounded font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus w-4 h-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>{" "}
        Add Transaction
      </div>

  </div>
)}

          {transactionFilter.map((transaction)=>{
  if(transaction.type === "Expense"){
    return(
      <div className="mb-4 md:mb-6" key={transaction.id}>
  <div className="flex hover:bg-gray-200 items-center justify-between bg-gray-100 rounded-xl p-3 md:p-4 shadow-sm">
   
    <div className="flex items-center gap-3 md:gap-4 min-w-0">
      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center bg-yellow-100 rounded-full text-xl">
        💸
      </div>
      <div className="min-w-0">
        <h2 className="font-semibold text-base md:text-lg text-gray-800 truncate">{transaction.description}</h2>
        <p className="text-xs md:text-sm text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-2">
      <p className="text-red-500 font-semibold text-base md:text-lg">
        -${formatAmount(transaction.amount)}
      </p>
      <button onClick={() => handleDelete(transaction.id)} className="text-red-500 hover:text-red-700">
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
      </button>
    </div>
  </div>
</div>
    )
  }else if(transaction.type === "Income"){
    return(
    <div className="mb-4 md:mb-6" key={transaction.id}>
  <div className="flex items-center hover:bg-gray-200 justify-between bg-gray-100 rounded-xl p-3 md:p-4 shadow-sm">
   
    <div className="flex items-center gap-3 md:gap-4 min-w-0">
      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center bg-blue-100 rounded-full text-xl">
        💰
      </div>
      <div className="min-w-0">
        <h2 className="font-semibold text-base md:text-lg text-gray-800 truncate">{transaction.description}</h2>
        <p className="text-xs md:text-sm text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-2">
      <p className="text-green-500 font-semibold text-base md:text-lg">
       +${formatAmount(transaction.amount)}
      </p>
      <button onClick={() => handleDelete(transaction.id)} className="text-red-500 hover:text-red-700">
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
      </button>
    </div>
  </div>
</div>)
  }
 })
}
          
        </div>
</div>
  );
};

export default Transactions;