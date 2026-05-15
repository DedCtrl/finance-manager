import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import app from "./../FirebaseConfig";
import Navbar from './Navbar'
import SettingTop from '../Settingpage/SettingTop'
import SettingProfile from '../Settingpage/SettingProfile'
import DownloadData from '../Settingpage/DownloadData';

const Setting = () => {
  const [transaction, setTransaction] = useState([])

  const db = getDatabase(app)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const dbRef = ref(db, `users/${user.uid}/transactions`);

      const unsubscribeDB = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setTransaction([]);
          return;
        }
        const transactions = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setTransaction(transactions)
      })
    })
  }, []);

  return (
    <div className='flex'>
      <Navbar />
      <div className='md:ml-[20%] w-full md:w-[80%] bg-[#F9FAFB] min-h-screen pb-20 md:pb-0'>
        <div className='px-4 sm:px-6 md:px-8 py-4 max-w-4xl mx-auto'>
          <SettingTop />
          <SettingProfile />
          <DownloadData transaction={transaction} />
        </div>
      </div>
    </div>
  )
}

export default Setting