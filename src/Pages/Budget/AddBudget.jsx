import React, { useState } from 'react'
import { getDatabase, ref, push, set } from "firebase/database";
import app from "../../FirebaseConfig";
import { getAuth } from 'firebase/auth';

const AddBudget = ({ setAddBudget }) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(app)
  const db = getDatabase(app);

  const addBudget = () => {
    setError("");

    if (!category || category === "Select a category") {
      setError("Please select a category.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!date) {
      setError("Please select a month.");
      return;
    }

    const user = auth.currentUser;
    const newDocRef = push(ref(db, `users/${user.uid}/budgets`));
    set(newDocRef, { date, category, amount: parseFloat(amount) }).then(() => {
      setAddBudget(false);
      setDate("");
      setCategory("");
      setAmount("");
    });
  };

  return (
    <div className='fixed inset-0 shadow-lg z-50 bg-black/50 flex items-center justify-center px-4 overflow-y-auto'>
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-lg p-6 relative">

        <button
          onClick={() => setAddBudget(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900">Add New Budget</h2>
        <p className="text-sm text-gray-500 mt-1">Set a spending limit for a category</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full bg-gray-100 rounded-lg px-4 py-2 text-gray-700 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="0.00"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month-Year</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="month"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={addBudget}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition">
            Add Budget
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBudget