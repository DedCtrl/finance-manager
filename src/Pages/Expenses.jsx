import React, { useState } from 'react'
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

  console.log(Search);
  

  return (
    <div className='flex'>
      <Navbar />
    {
        isOpen && <AddExpense setIsOpen={setIsOpen} />
    }
      <div className='w-[80%]  bg-[#F9FAFB] absolute right-0 '>
      <ExpensesTop setIsOpen={setIsOpen} />
      <ExpensesSearch setSearch={setSearch} Search={Search} />
      <Summary Search={Search} />
      <Transactions Search={Search} />
      </div>
    </div>
    
  )
}

export default Expenses