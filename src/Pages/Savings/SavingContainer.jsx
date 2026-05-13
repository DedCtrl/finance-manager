import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove, update } from "firebase/database";
import app from "../../FirebaseConfig";
import { log } from 'firebase/firestore/pipelines';

const SavingContainer = ({setAddSaving, setaddAmountTrigger , setTotalSaved, activeGoalId, setActiveGoalId, addAmountTrigger, setRemaining, Remaining, setTotalBudget, TotalBudget, TotalSpent, setTotalSpent}) => {

const [goals, setGoals] = useState([])
const [budgets, setBudgets] = useState([])

const auth = getAuth()
const db = getDatabase(app)

useEffect(()=>{
const unsubscribeAuth = onAuthStateChanged(auth, (user)=>{
if(!user) return;

const dbRef = ref(db, `users/${user.uid}/goals`);
const unsubscribeDB = onValue(dbRef, (snapshot)=>{
const data = snapshot.val()
if(!data){
  setGoals([]);
  return;
}

const goals = Object.entries(data).map(([id, value])=>({
  id,
  ...value
}))

setGoals(goals)

})

return ()=>{ unsubscribeDB() }

}) 

return () => unsubscribeAuth();

},[])



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

  const handleAddAmount = (amount) => {
    const user = auth.currentUser;
    if (!activeGoalId || !user) return;

    update(ref(db, `users/${user.uid}/goals/${activeGoalId}`), {
      savedAmount: amount
    });

    setActiveGoalId(null);
  }

 useEffect(() => {
    const total = goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0)
    setTotalSaved(total)
  }, [goals])


  const deleteGoal = (goalId) => {
    const user = auth.currentUser;
    if (!user) return;

    remove(ref(db, `users/${user.uid}/goals/${goalId}`));
  };

  return (
    <div className='px-4 md:px-8 mt-6 md:mt-8 w-full h-auto'>
        <div className='min-h-80 w-full'>
          <div className='flex items-center pb-3 justify-between'>
            <h1 className='font-semibold text-xl'>Goals</h1>
          </div>

          {goals.length === 0 && (
            <div className='bg-white rounded h-60 shadow-md w-full border flex flex-col justify-center items-center border-gray-200'>
                <div className='font-semibold text-lg py-2'>No Goals Found.</div>
                <div onClick={() => { setAddSaving(true) }}
                  className="text-white cursor-pointer bg-black flex justify-center items-center px-3 py-2 rounded font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus w-4 h-4 mr-2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>{" "}
                  Add Goal
                </div>
            </div>
          )}
                  
            {goals.map((goal)=>{
              const amount = goal.goalAmount
              const saved = goal.savedAmount
              const remaining = amount - saved
              const progress = (saved / amount) * 100

              return(
                <div key={goal.id} className='w-full py-3'>
                  <div className='bg-white flex flex-col w-full border border-gray-200 rounded px-4 md:px-5 py-4 shadow-md gap-4'>

                    {/* Header: icon + name + buttons */}
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex justify-center items-center shrink-0'>
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"></path><path d="M2 9v1c0 1.1.9 2 2 2h1"></path><path d="M16 11h.01"></path></svg>
                        </div>
                        <h1 className='font-semibold text-[15px] md:text-[16px]'>{goal.goalName}</h1>
                      </div>

                      <div className='flex gap-2 md:gap-3 items-center'>
                        <button 
                          onClick={() => {
                            setActiveGoalId(goal.id)
                            setaddAmountTrigger(true)
                          }}
                          className='bg-black text-white px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap'>
                          Add Amount
                        </button>
                        <button onClick={() => deleteGoal(goal.id)} className="text-red-500 hover:text-red-700 shrink-0">
                          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className='flex justify-between gap-3 md:gap-5 items-center'>
                      <div>
                        <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Target</h1>
                        <h1 className='font-bold text-lg md:text-xl text-green-500'>${goal.goalAmount}</h1>
                      </div>
                      <div>
                        <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Saved</h1>
                        <h1 className='font-bold text-lg md:text-xl'>${goal.savedAmount}</h1>
                      </div>
                      <div>
                        <h1 className='text-gray-500 text-[13px] md:text-[15px]'>Remaining</h1>
                        <h1 className='font-bold text-lg md:text-xl'>${remaining}</h1>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className='w-full'>
                      <div className='flex justify-between items-center'>
                        <h1 className='text-gray-500 text-sm'>Progress</h1>
                        <h1 className='text-gray-500 text-sm'>{progress.toFixed(2)}%</h1>
                      </div>
                      <div className='bg-[#CDCCD0] w-full h-2 mt-2 rounded-xl'>
                        <div className="bg-black h-full rounded-xl transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default SavingContainer