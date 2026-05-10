import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove, update } from "firebase/database";
import app from "../../FirebaseConfig";
import { log } from 'firebase/firestore/pipelines';
const SavingContainer = ({setaddAmountTrigger , setTotalSaved, activeGoalId, setActiveGoalId, addAmountTrigger, setRemaining, Remaining, setTotalBudget, TotalBudget, TotalSpent, setTotalSpent}) => {

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

return ()=>{
  unsubscribeDB()
}

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

    setActiveGoalId(null); // reset after save
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
    <div className='px-8 mt-8 w-full h-auto'>
        <div className=' min-h-80 w-full  py-5 '>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-xl'>Goals</h1>
          
                  </div>
            {goals.map((goal)=>{

              const amount = goal.goalAmount
              const saved = goal.savedAmount
              const remaining = amount - saved
              const progress = (saved / amount) * 100


              return( <div className=' h-70 w-full py-5 '>


              <div className='bg-white mb-5 h-55 flex justify-between flex-col w-full border border-gray-200 rounded px-5 py-4 shadow-md  '>
                <div className='flex justify-between  items-center mb-3'>
                  <div className='flex items-centre justify-center'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex justify-center items-center'>
                     <svg className="w-5.5 h-5.5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-piggy-bank w-5 h-5" data-fg-ujl3="2.26:2.6924:/src/app/pages/layout.tsx:65:13:2066:33:e:item.icon" data-fgid-ujl3=":r4gp:"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"></path><path d="M2 9v1c0 1.1.9 2 2 2h1"></path><path d="M16 11h.01"></path></svg>
                  </div>
                
                  <h1 className='px-3 py-3 font-semibold text-[16px]'>{goal.goalName}</h1>
                  
                  </div>
                 <div className='flex gap-3 items-center'>
                    <button 
                  onClick={()=>{
                    setActiveGoalId(goal.id)
                    setaddAmountTrigger(true)
                  }}
                  className='bg-black text-white p-1.5 rounded-lg text-sm mx-7 '>Add Amount</button>

                  <button onClick={() => deleteGoal(goal.id)} className="text-red-500 hover:text-red-700" >
                    
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
      </button>

</div>
                </div>
                <div className='flex justify-between mt-4  gap-5 items-center'>
    <div className=' h-17'>
    <h1 className='text-gray-500 text-[15px]'>Target</h1>
    <h1 className='font-bold text-xl text-green-500'>${goal.goalAmount}</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Saved</h1>
    <h1 className='font-bold  text-xl'>${goal.savedAmount}</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Remaining</h1>
    <h1 className='font-bold text-xl'>${remaining}</h1>
    </div>
            </div>
            
            <div className='w-full h-15 '>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 text-sm'>Progress</h1>
                <h1 className='text-gray-500 text-sm'>{progress.toFixed(2)}%</h1>
                </div>
                <div className='bg-[#CDCCD0] w-full h-2 mt-2 rounded-xl'>
                  <div
  className="bg-black h-full rounded-xl transition-all duration-500"
  style={{ width: `${progress}%` }}
></div>
                </div>
            </div>



              </div>
        


              
            </div>)
            })}
            
        </div>
    </div>
  )
}

export default SavingContainer