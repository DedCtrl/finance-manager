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
const [typeFilter, setTypeFilter] = useState('')
const [categoryFilter, setCategoryFilter] = useState('')
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
      <div className='md:ml-[20%] w-full md:w-[80%] bg-[#F9FAFB] min-h-screen pb-20 md:pb-0'>
      <ExpensesTop setIsOpen={setIsOpen} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      <ExpensesSearch setSearch={setSearch} Search={Search} setTypeFilter={setTypeFilter} setCategoryFilter={setCategoryFilter} typeFilter={typeFilter} categoryFilter={categoryFilter} />
      <Summary Search={Search} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
      <Transactions setIsOpen={setIsOpen} Search={Search} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} setTypeFilter={setTypeFilter} setCategoryFilter={setCategoryFilter} typeFilter={typeFilter} categoryFilter={categoryFilter} />
      </div>
    </div>
    
  )
}

export default Expenses