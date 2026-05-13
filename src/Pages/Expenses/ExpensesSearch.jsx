import React, { useState } from "react";

const ExpensesSearch = ({ setSearch, Search, setTypeFilter, setCategoryFilter, typeFilter, categoryFilter }) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = typeFilter || categoryFilter;

  return (
    <div className="w-full px-4 md:px-8 py-3">

      {/* ── MOBILE LAYOUT (hidden on md+) ── */}
      <div className="md:hidden flex flex-col gap-2">

        {/* Row 1: search bar + filter toggle button */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center gap-2 px-3 py-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 shrink-0">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="outline-none bg-transparent w-full text-sm"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search transactions..."
            />
            {Search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter toggle button with active dot indicator */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative shrink-0 w-11 h-11 rounded-xl border shadow-sm flex items-center justify-center transition-colors ${showFilters ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            {hasActiveFilters && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Row 2: expandable filter panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 flex flex-col gap-3">
            {/* Type pills */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1.5">TYPE</p>
              <div className="flex gap-2">
                {["All", "Income", "Expense"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t === "All" ? "" : t)}
                    className={`flex-1 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                      (t === "All" && !typeFilter) || typeFilter === t
                        ? "bg-black text-white border-black"
                        : "bg-[#F3F3F5] text-[#232121] border-transparent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Category select */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1.5">CATEGORY</p>
              <div className="bg-[#F3F3F5] rounded-lg">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value === "all" ? "" : e.target.value)}
                  className="w-full outline-none text-sm font-semibold bg-transparent px-3 py-2 text-[#232121]"
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

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={() => { setTypeFilter(""); setCategoryFilter(""); }}
                className="w-full py-1.5 rounded-lg text-sm font-semibold text-red-500 border border-red-200 bg-red-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
      <div className="hidden md:flex bg-white shadow-md w-full rounded-xl border border-gray-200 items-center gap-3 px-6 py-4">

        {/* Search Input */}
        <div className="w-1/3">
          <h3 className="font-semibold">Search</h3>
          <div className="bg-[#F3F3F5] py-2 px-10 rounded flex items-center gap-2 mt-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="outline-none bg-transparent w-full text-sm"
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
            onClick={() => { setSearch(""); setTypeFilter(""); setCategoryFilter(""); }}
            className="bg-black text-white font-semibold mt-5.5 px-3 py-1 rounded">
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExpensesSearch;