import React from 'react'

const BudgetTop = ({ setAddBudget, setSelectedMonth, selectedMonth }) => {
  return (
    <div className="w-full h-25 px-8 py-5 flex justify-between items-center ">
      <div>
        <h1 className="text-3xl font-bold">Budget</h1>
        <h3 className="text-[#6A7282]">Set and track your spending limits</h3>
      </div>
      <div>
      <label className='text-lg font-semibold'>Search</label>
      <input
      className='bg-white p-3 border border-gray-200 ml-5'
      type="month" value={selectedMonth}  onChange={(e) => setSelectedMonth(e.target.value)} />
      </div>


      <div onClick={
        () => {
          setAddBudget(true)
        }
      } 
      className="text-white cursor-pointer bg-black flex justify-center items-center px-3 py-2 rounded font-semibold ">
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
        Add Budget
      </div>
    </div>
  )
}

export default BudgetTop