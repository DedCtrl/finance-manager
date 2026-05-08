import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "../../FirebaseConfig";

const Transactions = ({ Search , setSelectedMonth , selectedMonth }) => {
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
  const search = (Search || '').toLowerCase();

  const matchesSearch =
    t.description.toLowerCase().includes(search) ||
    t.category.toLowerCase().includes(search) ||
    t.type.toLowerCase().includes(search);

  const transactionMonth = new Date(t.date).toISOString().slice(0, 7);

  const matchesMonth = selectedMonth
    ? transactionMonth === selectedMonth
    : true;

  return matchesSearch && matchesMonth;
});




  return (
    <div className=' bg-white min-h-90 mx-8 px-8 py-4 shadow-md rounded-xl border border-gray-200  h-full flex flex-col   '>
        <h1 className='text-[18px] font-semibold'>Transactions</h1>

        <div className="mt-5  w-full min-h-90 rounded-md  py-5 ">
          {transactionFilter.map((transaction)=>{
  if(transaction.type === "Expense"){
    return(
      <div className=" mb-6 ">
  <div className="flex  hover:bg-gray-200 items-center justify-between bg-gray-100 rounded-xl p-4 shadow-sm">
   
    <div className="flex items-center gap-4">
      
 
      <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full text-xl">
        💸
      </div>

  
      <div>
        <h2 className="font-semibold text-lg text-gray-800">{transaction.description}</h2>
        <p className="text-sm text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>
    </div>

    
    <div className="flex items-center gap-4">
      
      
      <p className="text-red-500 font-semibold text-lg">
        -{transaction.amount}
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
    <div className=" mb-6  ">
  <div className="flex items-center hover:bg-gray-200 justify-between bg-gray-100 rounded-xl p-4 shadow-sm">
   
    <div className="flex items-center gap-4">
      
 
      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-xl">
        💰
      </div>

  
      <div>
        <h2 className="font-semibold text-lg text-gray-800">{transaction.description}</h2>
        <p className="text-sm text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>
    </div>

    
    <div className="flex items-center gap-4">
      
      
      <p className  ="text-green-500 font-semibold text-lg">
        +${transaction.amount}
      </p>

  


      
      <button onClick={() => handleDelete(transaction.id)} className ="text-red-500 hover:text-red-700">
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
