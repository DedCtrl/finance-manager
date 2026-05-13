import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BudgetTop from './Budget/BudgetTop'
import OverallBudget from './Budget/OverallBudget'
import BudgetContainer from './Budget/BudgetContainer'
import AddBudget from './Budget/AddBudget'

const Budget = () => {
  const [addBudget, setAddBudget] = useState(false)
const [selectedMonth, setSelectedMonth] = useState('')

useEffect(() => {
  const today = new Date();
  const month = today.toISOString().slice(0, 7);
  setSelectedMonth(month);
}, []);

  return (
    <div>
      <Navbar />
      {addBudget && <AddBudget setAddBudget={setAddBudget} />}
      <div className='md:ml-[20%] w-full md:w-[80%] bg-[#F9FAFB] min-h-screen pb-20 md:pb-0'>
      <BudgetTop setAddBudget={setAddBudget} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      <OverallBudget selectedMonth={selectedMonth} />
      <BudgetContainer setAddBudget={setAddBudget} addBudget={addBudget} selectedMonth={selectedMonth} />
      </div>
    </div>
  )
}

export default Budget