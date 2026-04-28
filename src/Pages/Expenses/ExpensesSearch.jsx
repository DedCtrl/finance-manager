import React from "react";

const ExpensesSearch = ({ setSearch, Search }) => {
  return (
    <div className="w-full  h-35  px-8 py-3 flex justify-between items-center">
      <div className="bg-white shadow-md  w-full h-full rounded-xl border border-gray-200 flex items-center gap-3 px-6 ">
        <div className="w-1/3  ">
          <h3 className="font-semibold">Search</h3>
          <div className="bg-[#F3F3F5] py-2 px-10 rounded flex items-center gap-2 mt-1 relative">
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
              class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input 
            className="outline-none"
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
            type="text" placeholder="Search transactions..." />
          </div>
        </div>
        <div className="w-1/3  ">
          <h3 className="font-semibold">Type</h3>
          <div className="bg-[#F3F3F5] py-2 justify-between rounded flex items-center gap-2 mt-1 relative">
            <select
            
            value={Search}
            onChange={(e) =>{
      if(e.target.value === "All"){
        setSearch("")
      }else{
        setSearch(e.target.value)
      }
    }}
              name=""
              id=""
              className="flex outline-0 justify-between w-[94%] text-[14px] font-semibold bg-transparent px-3 text-[#232121]"
            >
              <option value="All" >All</option>
              <option value="Income" >Income</option>
              <option value="Expense" >Expense</option>
            </select >
          </div>
        </div>
        <div className="w-1/3  ">
          <h3 className="font-semibold">Category</h3>
          <div className="bg-[#F3F3F5] py-2 rounded flex items-center gap-2 mt-1 relative">
            <select
            onChange={(e) =>{
      if(e.target.value === "all"){
        setSearch("")
      }else{
        setSearch(e.target.value)
      }
    }}
            id="category" name="category"  className="flex outline-0 justify-between w-[94%] text-[14px] font-semibold bg-transparent px-3 text-[#232121]">
              <option value="all" selected>
                All Categories
              </option>
              <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills & Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSearch;
