import React, { useState } from "react";
import AddExpense from "./AddExpense";

const ExpensesTop = ( { isOpen, setIsOpen, setSelectedMonth, selectedMonth, StatementOpen, setStatementOpen } ) => {

  const [DropDown, setDropDown] = useState(false)

  return (
    <div className="w-full px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>
        <h3 className="text-[#6A7282] text-sm md:text-base">Track and manage your transactions</h3>
      </div>
      <div>
        <label className='text-base md:text-lg font-semibold'>Search</label>
        <input
          className='bg-white p-2 md:p-3 border border-gray-200 ml-3 md:ml-5 rounded-xl shadow-sm text-sm md:text-base'
          type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}/>
      </div>

      {/* <div onClick={() => { setIsOpen(true) }} >
        
          <div className="text-white cursor-pointer bg-black flex justify-center items-center px-3 py-2 rounded font-semibold text-sm md:text-base w-full sm:w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus w-4 h-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>{" "}
        Add Transaction
        </div>
         { isOpen === true && (
  <div>
    <div>Add Manually </div> 
    <div>Import from CSV</div> 
  </div>
 ) }
      </div> */}

<div class="relative inline-block text-left">
  

  <button 
    onClick={() => { setDropDown(!DropDown) }}
    class="bg-black text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
  >
   + Add Transaction 
  </button>

  {DropDown == true && (
    <div class="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
      <button onClick={() => { {setIsOpen(true) , setDropDown(false)} }} class="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
        Add Manually
      </button>
      {/* <button onClick={()=>{ setStatementOpen(true) , setDropDown(false) }} class="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
        Transaction Statement
      </button> */}
    </div>
  )}
</div>
     
    </div>
  );
};

export default ExpensesTop;