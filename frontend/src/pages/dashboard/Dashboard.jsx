import React from 'react'
import styles from './Dashboard.module.css'
import axios from 'axios'

import NewEntry from '../../components/newEntry/NewEntry'
import EntryCard from '../../components/entryCard/EntryCard'

import {HiOutlineUserCircle} from 'react-icons/hi'

import { useGlobalContext } from '../../context/GlobalContext.js'

const Dashboard = () => {

  const {user, entries} = useGlobalContext()

  console.log(entries)


  const getAllEntries = async () => {
    try {
      const res = await axios.get("/api/entry")

      if(res.data) {
        // console.log(res.data)
      }


    } catch (error) {
      console.log(error)
    }
  }

  getAllEntries()

  return (
    <main className={styles.dashboard}>
      {/* User Info Container*/}
      <div className={styles.user_info}>
        {/* User */}
        <div>
          <HiOutlineUserCircle size={25} />
          <h3>Alvaro Ormeno</h3>
        </div>
        {/* Entries Info */}
        <div>
          <p>Number of entries:</p>
          <p>45</p>
        </div>
      </div>

      {/* New Entry */}
      <NewEntry />

      {/* Entry Card */}
      <EntryCard />

    </main>
  )
}

export default Dashboard