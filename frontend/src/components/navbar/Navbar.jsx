import React from 'react'
import {BsJournalBookmark} from 'react-icons/bs'

import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      {/* Logo + Title Container */}
      <div className={styles.logo}>
        <BsJournalBookmark size={40} />
        <h1>MY DIARY APP</h1>
      </div>
      {/* Desktop Menu Container */}
      <nav>
        <ul className={styles.menu}>
          <li>
            <a href="">Journaling Benefits</a>
          </li>
          <li>
            <a href="">Login In</a>
          </li>
          <li>
          <a href="">Sign Out</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar