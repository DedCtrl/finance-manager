import React, { useState } from 'react'
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "../../FirebaseConfig";
import { getAuth } from 'firebase/auth';

const AddSaving = ({setAddSaving, AddSaving}) => {
    const [goalName, setGoalName] = useState('')
    const [goalAmount, setGoalAmount] = useState('')
    const [savedAmount, setSavedAmount] = useState(0)
    const [error, setError] = useState('')
    const auth = getAuth()
    const db = getDatabase(app)

    const addGoal =()=>{
        setError('')
        if(!goalName){
            setError("Please enter a goal name.")
        }else if(!goalAmount || parseFloat(goalAmount) <= 0){
            setError("Please enter a valid goal amount.")
        }

        const user = auth.currentUser;
  const uid = user.uid
        const newDocRef = push(ref(db,`users/${uid}/goals`))
        set(newDocRef,{
            goalName:goalName,
            goalAmount:goalAmount,
            savedAmount:savedAmount
        }).then(()=>{
            setGoalAmount('')
            setGoalName('')
            setAddSaving(false)
        })
    }

  return (
    <div className='fixed inset-0 shadow-lg z-100 bg-black/50 flex items-center justify-center px-4 overflow-y-auto'>
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-lg p-6 relative">

        <button 
          onClick={() => { setAddSaving(false) }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900">Create Savings Goal</h2>
        <p className="text-sm text-gray-500 mt-1">Set a new goal to save towards</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input
              onChange={(e) => { setGoalName(e.target.value) }}
              type="text"
              placeholder="Set e.g Vacations, Emergency Funds"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Amount</label>
            <input
              onChange={(e) => { setGoalAmount(e.target.value) }}
              type="number"
              placeholder="0.00"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none"
            />
          </div>
            {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          <button onClick={addGoal} className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition">
            Add Goal
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSaving