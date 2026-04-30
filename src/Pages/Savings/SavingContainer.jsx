import React from 'react'

const SavingContainer = () => {
  return (
    <div className='px-8 mt-8 w-full h-auto'>
        <div className=' min-h-80 w-full  py-5 '>
            <h1 className='font-semibold text-xl'>Goals</h1>
            <div className=' h-70 w-full py-5 '>


              <div className='bg-white mb-5 h-55 flex justify-between flex-col w-full border border-gray-200 rounded px-5 py-4 shadow-md  '>
                <div className='flex justify-between  items-center mb-3'>
                  <div className='flex items-centre justify-center'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex justify-center items-center'>
                     <svg className="w-5.5 h-5.5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-piggy-bank w-5 h-5" data-fg-ujl3="2.26:2.6924:/src/app/pages/layout.tsx:65:13:2066:33:e:item.icon" data-fgid-ujl3=":r4gp:"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"></path><path d="M2 9v1c0 1.1.9 2 2 2h1"></path><path d="M16 11h.01"></path></svg>
                  </div>
                  <div className='items-center '>
                  <h1 className='px-3 font-semibold text-[16px]'>Laptop</h1>
                  <h2 className='px-3 text-gray-500 text-[17px]'>Traget: $2</h2>
                  </div>
                  </div>
                 
                  <button className="text-red-500 hover:text-red-700" >
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
      </button>


                </div>
                <div className='flex justify-between mt-4  gap-5 items-center'>
    <div className=' h-17'>
    <h1 className='text-gray-500 text-[15px]'>Saved</h1>
    <h1 className='font-bold text-xl text-green-500'>$100</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Remaining</h1>
    <h1 className='font-bold  text-xl'>$100</h1>
    </div>
    <div className=' h-17 '>
    <h1 className='text-gray-500 text-[15px]'>Progress</h1>
    <h1 className='font-bold text-xl'>$100</h1>
    </div>
            </div>
            
            <div className='w-full h-15 '>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 text-sm'>Progress</h1>
                <h1 className='text-gray-500 text-sm'>9%</h1>
                </div>
                <div className='bg-[#CDCCD0] w-full h-2 mt-2 rounded-xl'>
                  <div className='bg-black h-full   rounded-xl '></div>
                </div>
            </div>



              </div>
        


              
            </div>
        </div>
    </div>
  )
}

export default SavingContainer