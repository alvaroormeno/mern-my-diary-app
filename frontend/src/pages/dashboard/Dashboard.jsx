import React from 'react'
import styles from './Dashboard.module.css'

import NewEntry from '../../components/newEntry/NewEntry'

import {HiOutlineUserCircle} from 'react-icons/hi'

const Dashboard = () => {
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
      

    </main>
  )
}

export default Dashboard