import React from "react";

const ExpensesSearch = ({ setSearch, Search, setTypeFilter, setCategoryFilter, typeFilter, categoryFilter }) => {

  return (
    <div className="w-full h-35 px-8 py-3">
      <div className="bg-white shadow-md justify-between w-full h-full rounded-xl border border-gray-200 flex items-center gap-3 px-6">
        
        {/* Search Input */}
        <div className="w-1/3">
          <h3 className="font-semibold">Search</h3>
          <div className="bg-[#F3F3F5] py-2 px-10 rounded flex items-center gap-2 mt-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="outline-none bg-transparent"
              value={Search}
      onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search transactions..."
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="w-1/3">
          <h3 className="font-semibold">Type</h3>
          <div className="bg-[#F3F3F5] py-2 justify-between rounded flex items-center gap-2 mt-1">
            <select
            value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value === "All" ? "" : e.target.value)}
              className="flex outline-0 w-[94%] text-[14px] font-semibold bg-transparent px-3 text-[#232121]"
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-1/3">
          <h3 className="font-semibold">Category</h3>
          <div className="bg-[#F3F3F5] py-2 rounded flex items-center gap-2 mt-1">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value === "all" ? "" : e.target.value)}
              className="flex outline-0 w-[94%] text-[14px] font-semibold bg-transparent px-3 text-[#232121]"
            >
              <option value="all">All Categories</option>
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

        {/* Clear Button */}
        <div>
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("");
              setCategoryFilter("");
            }}
            className="bg-black text-white font-semibold mt-5.5 px-3 py-1 rounded">
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExpensesSearch;