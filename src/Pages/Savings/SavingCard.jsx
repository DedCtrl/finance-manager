import React, { useState } from 'react'

const SavingCard = ({totalSaved, setRemaining, Remaining, setTotalBudget, TotalBudget, TotalSpent, setTotalSpent}) => {

  return (
    <div className="w-full px-4 md:px-8 py-3 gap-4 md:gap-7 flex flex-col sm:flex-row justify-between items-stretch">

        <div className='bg-white w-full sm:w-1/2 border border-gray-200 rounded-xl shadow-md px-5 py-5 flex flex-col justify-between'>
          <div className='flex justify-between flex-col'>
            <h1 className='font-semibold text-[16px]'>Total Saved</h1>
            <h1 className='text-3xl md:text-4xl font-semibold text-green-600'>${totalSaved}</h1>
          </div>
          <p className='text-[12px] text-gray-500 mt-2'>Allocated to goals</p>
        </div>

        <div className='bg-white w-full sm:w-1/2 border border-gray-200 rounded-xl shadow-md px-5 py-5 flex flex-col justify-between'>
          <div className='flex flex-col justify-between'>
            <h1 className='font-semibold text-[16px]'>Available to Save</h1>
            <h1 className='text-3xl md:text-4xl font-semibold text-blue-600'>${(Remaining).toFixed(2)}</h1>
          </div>
          <p className='text-[12px] text-gray-500 mt-2'>Ready to allocate</p>
        </div>

    </div>
  )
}

export default SavingCard