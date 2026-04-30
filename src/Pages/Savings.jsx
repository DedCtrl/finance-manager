import React, { useState } from 'react'
import Navbar from './Navbar'
import SavingTop from './Savings/SavingTop'
import SavingCard from './Savings/SavingCard'
import SavingContainer from './Savings/SavingContainer'
import AddSaving from './Savings/AddSaving'

const Savings = () => {

  const [addSaving, setAddSaving] = useState(false)
console.log(addSaving);

  return (
    <div>
      <Navbar />
      {addSaving &&  <AddSaving addSaving={addSaving} setAddSaving={setAddSaving} />}
      <div  className='w-[80%]  bg-[#F9FAFB] absolute right-0 '>
      <SavingTop addSaving={addSaving} setAddSaving={setAddSaving} />
      <SavingCard />
      <SavingContainer />
      </div>
    </div>
  )
}

export default Savings