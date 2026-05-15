import React from 'react'

const TransactionStatement = ({ setStatementOpen }) => {

    
  return (
    <div className='fixed inset-0 shadow-lg z-100 bg-black/50 flex items-center justify-center px-4 overflow-y-auto'>
       <form action="" onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <div className='xl:w-150 md:w-100 sm:w-100  bg-white rounded-xl px-5 py-5'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-lg font-semibold'>Import Transaction Statement</h1>
            <button onClick={()=>{
              setStatementOpen(false)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
            </div>


            <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900 mb-1">
      Upload a CSV or PDF statement to auto-import your transactions.
    </label>
    <input
  type="file"
  accept=".pdf,.csv,image/*"
  onChange={(e) => console.log(e.target.files[0])}
  placeholder='Submit your file'
/>
  </div>
        


  


  {/* <button onClick={addTransaction}  className="w-full bg-black text-white py-2 rounded-xl font-medium hover:opacity-90 transition">
    Add Transaction
  </button>
   */}
        </div>
      </form>
        
    </div>
  )
}

export default TransactionStatement