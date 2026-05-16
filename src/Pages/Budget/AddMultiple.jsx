import { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import app from "../../FirebaseConfig";

const categories = [
  { key: "groceries", label: "Groceries", icon: "🛒" },
  { key: "food", label: "Food & Dining", icon: "🍽️" },
  { key: "transport", label: "Transportation", icon: "🚗" },
  { key: "rent", label: "Rent", icon: "🏠" },
  { key: "electricity", label: "Electricity", icon: "⚡" },
  { key: "internet", label: "Internet", icon: "📶" },
  { key: "healthcare", label: "Healthcare", icon: "🏥" },
  { key: "shopping", label: "Shopping", icon: "🛍️" },
  { key: "entertainment", label: "Entertainment", icon: "🎬" },
  { key: "education", label: "Education", icon: "🎓" },
  { key: "travel", label: "Travel", icon: "✈️" },
  { key: "investments", label: "Investments", icon: "📈" },
  { key: "emi", label: "EMI", icon: "🏦" },
  { key: "personalcare", label: "Personal Care", icon: "💆" },
  { key: "other", label: "Other", icon: "📦" },
];


const AddMultiple = ({ setAddMultipleBudgets }) => {
  const [month, setMonth] = useState("");
  const [amounts, setAmounts] = useState({});
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const db = getDatabase(app);

  const handleAmount = (category, value) => {
    setAmounts((prev) => ({ ...prev, [category]: value }));
  };

  const total = Object.values(amounts).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0
  );

  const handleSave = async () => {
    setError("");
    if (!month) {
      setError("Please select a month.");
      return;
    }

    const entries = Object.entries(amounts)
      .filter(([_, amt]) => parseFloat(amt) > 0)
      .map(([category, amount]) => ({
        category,
        amount: parseFloat(amount),
        date: month,
      }));

    if (entries.length === 0) {
      setError("Enter an amount for at least one category.");
      return;
    }

    const user = auth.currentUser;
    entries.forEach(async (entry) => {
      const newRef = push(ref(db, `users/${user.uid}/budgets`));
      await set(newRef, entry);
    });

    setAddMultipleBudgets(false);
  };

  // ✅ return is here at the component level, NOT inside handleSave
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">

        {/* Header */}
        <button
          onClick={() => setAddMultipleBudgets(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Bulk Add Budgets</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set spending limits for multiple categories at once
        </p>

        {/* Month picker */}
        <div className="mt-5 flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Month & Year
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <hr className="my-4 border-gray-100" />

        {/* Category list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5"
            >
              <span className="text-sm text-gray-800 flex-1 truncate">{cat.label}</span>
              <input
                type="number"
                min="0"
                placeholder="0.00"
                value={amounts[cat.key] || ""}
                onChange={(e) => handleAmount(cat.key, e.target.value)}
                className="w-20 text-right bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs text-gray-500">Total budget</p>
            <p className="text-base font-semibold text-gray-900">
              ₹{total.toFixed(2)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAddMultipleBudgets(false)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
            >
              Save Budgets
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddMultiple;