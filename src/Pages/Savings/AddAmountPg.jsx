import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from "firebase/database";
import app from "../../FirebaseConfig";

const AddAmountPg = ({ setaddAmountTrigger,Remaining, setAmountToSave, amountToSave, activeGoalId, setActiveGoalId }) => {

  const auth = getAuth()
  const db = getDatabase(app)
  const [error, setError] = useState('')

  const addAmount = () => {
    const user = auth.currentUser;
    if (!user || !activeGoalId) return;

    const goalRef = ref(db, `users/${user.uid}/goals/${activeGoalId}`);

    get(goalRef).then((snapshot) => {
      const currentSaved = snapshot.val()?.savedAmount || 0;

      set(goalRef, {
        ...snapshot.val(),
        savedAmount: currentSaved + amountToSave
      }).then(() => {
        setaddAmountTrigger(false)
        setAmountToSave(0)
      })
    })
  }

  return (
    <div className='fixed inset-0 shadow-lg z-100 bg-black/50 flex items-center justify-center px-4 overflow-y-auto'>
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-lg p-6 relative">

        <button
          onClick={() => setaddAmountTrigger(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900">Add Amount to Savings</h2>
        <p className="text-sm text-gray-500 mt-1">Add funds to your savings goal</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount to Add
            </label>
            <input
              type="number"
              min="0"
              placeholder="0.00"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none"
              onChange={(e) => {
  const value = parseFloat(e.target.value);
  if (value > 0) {
    setAmountToSave(value);
  }
}}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={() => {
              if(amountToSave > 0 && amountToSave <= Remaining){
                addAmount()
              } else { 
                setError(`Please enter an amount between 0 and ${Remaining}`)
              }
            }}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition">
            Add Amount
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddAmountPg