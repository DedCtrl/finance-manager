import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ExpensesTop from './Expenses/ExpensesTop'
import ExpensesSearch from './Expenses/ExpensesSearch'
import Summary from './Expenses/Summary'
import Transactions from './Expenses/Transactions'
import AddExpense from './Expenses/AddExpense'
import { useSearchParams } from 'react-router-dom'
const Expenses = () => {
  const [Search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState('')
  
  useEffect(() => {
    const today = new Date();
    const month = today.toISOString().slice(0, 7); // "2026-04"
    setSelectedMonth(month);
  }, []);
     

  

  return (
    <div className='flex'>
      <Navbar />
    {
        isOpen && <AddExpense setIsOpen={setIsOpen} />
    }
      <div className='w-[80%]  bg-[#F9FAFB] absolute right-0 '>
      <ExpensesTop setIsOpen={setIsOpen} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      <ExpensesSearch setSearch={setSearch} Search={Search} />
      <Summary Search={Search} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      <Transactions Search={Search} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      </div>
    </div>
    
  )
}

export default Expenses