import React, { useState } from "react";
import Papa from "papaparse";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from "firebase/database";
import app from "./../FirebaseConfig";
 import {  reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider, reauthenticateWithPopup, reauthenticateWithRedirect } from "firebase/auth";
import {
  Download,
  Upload,
  Trash2,
} from "lucide-react";

const DownloadData = ({ transaction }) => {

  const [confirmDelete, setConfirmDelete] = useState(false)

  const db = getDatabase(app)
  const auth = getAuth()

  const handleDownload = () => {

    if (!transaction.length) {
      alert("No transactions available");
      return;
    }

    try {

      const csv =
        Papa.unparse(transaction);

      const blob = new Blob(
        [csv],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

      const fileUrl =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = fileUrl;
      link.download = "transaction.csv";

      link.click();

      URL.revokeObjectURL(fileUrl);

    } catch (error) {


      alert("Failed to download CSV");
    }
  };

 

const [reAuthPassword, setReAuthPassword] = useState("")
const [reAuthError, setReAuthError] = useState("")

const handleDelete = async () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  setReAuthError("");

  try {
    // Check if user signed in with Google or Email
    const providerData = user.providerData[0].providerId;

    if (providerData === "google.com") {
      // Google user — reauthenticate with Google
      const provider = new GoogleAuthProvider();
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        await reauthenticateWithRedirect(user, provider);
      } else {
        await reauthenticateWithPopup(user, provider);
      }
    } else {
      // Email/password user — reauthenticate with password
      const credential = EmailAuthProvider.credential(user.email, reAuthPassword);
      await reauthenticateWithCredential(user, credential);
    }

    // If reauthentication passed, delete data
    const dbRef = ref(db, `users/${user.uid}`);
    await remove(dbRef);
    setConfirmDelete(false);
    window.location.reload();
    

  } catch (error) {
    if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      setReAuthError("Incorrect password. Please try again.");
    } else {
      setReAuthError("Verification failed. Please try again.");
    }
  }
};
  const confirmDeletefn = () =>{
    return (
<div></div>
    )
  }

  return (
    <div className="w-full bg-white border mt-8 border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-black">
          Data Management
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Export, import, or delete your data
        </p>
      </div>

      {/* Export Card */}
      <div className="w-full border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

        <div className="flex items-start sm:items-center gap-4">
          <div className="text-blue-600 shrink-0">
            <Download size={22} />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-black">
              Export Data
            </h3>

            <p className="text-gray-500 text-sm mt-0.5">
              Download your data as CSV
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full sm:w-fit border border-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
          Export
        </button>
      </div>

     
      {/* <div className="w-full border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

        <div className="flex items-start sm:items-center gap-4">
          <div className="text-green-600 shrink-0">
            <Upload size={22} />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-black">
              Import Data
            </h3>

            <p className="text-gray-500 text-sm mt-0.5">
              Restore from a backup file
            </p>
          </div>
        </div>

        <button className="w-full sm:w-fit border border-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
          Import
        </button>
      </div> */}

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

     {confirmDelete == false && (<div className="w-full border border-red-200 bg-red-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-start sm:items-center gap-4">
          <div className="text-red-600 shrink-0">
            <Trash2 size={22} />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-red-600">
              Clear All Data
            </h3>

            <p className="text-red-500 text-sm mt-0.5">
              Permanently delete all your data
            </p>
          </div>
        </div>

        <button onClick={()=>{
          setConfirmDelete(true)
        }}    className="w-full sm:w-fit bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg text-sm font-medium">
          Delete All
        </button>

      </div>
)}
      
{confirmDelete && (
  <div className="w-full border mt-3 border-red-200 bg-red-50 rounded-xl p-4 flex flex-col gap-4">
    <div className="flex items-start gap-4">
      <div className="text-red-600 shrink-0"><Trash2 size={22} /></div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-red-600">
          Verify your identity
        </h3>
        <p className="text-red-500 text-sm mt-0.5">
          This will permanently delete all your data
        </p>
      </div>
    </div>

    {/* Only show password input for email users */}
    {auth.currentUser?.providerData[0]?.providerId !== "google.com" && (
      <input
        type="password"
        placeholder="Enter your password to confirm"
        onChange={(e) => setReAuthPassword(e.target.value)}
        className="bg-white border border-red-200 p-2 rounded-lg outline-none text-sm w-full"
      />
    )}

    {reAuthError && (
      <p className="text-red-500 text-sm bg-white p-1 rounded">{reAuthError}</p>
    )}

    <div className="flex gap-3">
      <button
        onClick={handleDelete}
        className="flex-1 bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg text-sm font-medium"
      >
        Confirm Delete
      </button>
      <button
        onClick={() => { setConfirmDelete(false); setReAuthError(""); }}
        className="flex-1 bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg text-sm font-medium"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default DownloadData;