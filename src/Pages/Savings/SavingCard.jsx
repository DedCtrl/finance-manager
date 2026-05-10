import React, { useState } from 'react'

const SavingCard = ({totalSaved, setRemaining, Remaining, setTotalBudget, TotalBudget, TotalSpent, setTotalSpent}) => {




  return (
    
    <div className="w-full h-45  px-8 py-3 gap-7  flex justify-between items-center">



      




        <div className='bg-white w-1/2 border  border-gray-200 h-full rounded-xl shadow-md px-5 py-5 flex flex-col justify-between ' >
    <div className='flex justify-between flex-col '>
            <h1 className='font-semibold text-[16px]'>Total Saved</h1>
            <h1 className='text-4xl font-semibold text-green-600' >${totalSaved}</h1>
             </div>
            <p className='text-[12px] text-gray-500'>Allocated to goals</p>
        </div>



        <div className='bg-white w-1/2 border  border-gray-200 h-full rounded-xl shadow-md px-5 py-5 flex flex-col justify-between ' >
    <div className='flex flex-col justify-between  '>
            <h1 className='font-semibold text-[16px]'>Available to Save</h1>
            <h1 className={`text-4xl font-semibold text-blue-600`}>${(Remaining).toFixed(2)}</h1>
              </div>
            <p className='text-[12px] text-gray-500'>Ready to allocate</p>
        </div>

    </div>
  )
}

export default SavingCard