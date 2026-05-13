import React, { useState } from 'react'
import { getDatabase, ref, push, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
import { getAuth } from 'firebase/auth';
const AddExpense = ({ setIsOpen }) => {

const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [type, setType] = useState("Expense");
const [description, setDescription] = useState("");
const [date, setDate] = useState("");



  const auth = getAuth()
  
  const db = getDatabase(app);

  const addTransaction =()=>{
    const user = auth.currentUser;
  const uid = user.uid

    const  newDocRef = push(ref(db, `users/${uid}/transactions` ))
    set(newDocRef, {
      type: type,
      amount: amount,
      category: category,
      description: description,
      date: date
      
    }).then(()=>{
      setIsOpen(false)
      setAmount("");
setCategory("");
setType("Expense");
setDescription("");
setDate("");
    })

  }



  return (
    <div className='fixed inset-0 shadow-lg z-100 bg-black/50 flex items-center justify-center px-4 overflow-y-auto'>
      <form action="" onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <div className='xl:w-150 md:w-100 sm:w-100  bg-white rounded-xl px-5 py-5'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-lg font-semibold'>Add New Transaction</h1>
            <button onClick={()=>{
              setIsOpen(false)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
            </div>

            <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-900 mb-1">
      Type
    </label>
    <select
    required
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="w-full bg-gray-100 rounded-lg px-4 py-2 text-gray-700 outline-none">
      <option>Expense</option>
      <option>Income</option>
    </select>
  </div>

  {/* Amount */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900 mb-1">
      Amount
    </label>
    <input
    required
    onChange={(e)=>{
      setAmount(e.target.value)
      
    }}
      type="number"
      placeholder="0.00"
      className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
    />
  </div>

  {/* Category */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900 mb-1">
      Category
    </label>
    <select
    required
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full bg-gray-100 rounded-lg px-4 py-2 text-gray-700 outline-none">
      <option>Select a category</option>
      <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills & Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
    </select>
  </div>

  {/* Description */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900 mb-1">
      Description
    </label>
    <input
    required
    onChange={(e)=>{
      setDescription(e.target.value)
    }}
      type="text"
      placeholder="What was this for?"
      className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
    />
  </div>

  {/* Date */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-900 mb-1">
      Date
    </label>
    <input
    required
    onChange={(e)=>{
      setDate(e.target.value)
    }}
      type="date"
      className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none text-gray-700"
    />
  </div>

  {/* Button */}
  <button onClick={addTransaction}  className="w-full bg-black text-white py-2 rounded-xl font-medium hover:opacity-90 transition">
    Add Transaction
  </button>
  
        </div>
      </form>
        
    </div>
  )
}

export default AddExpense