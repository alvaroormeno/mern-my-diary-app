import React from 'react'

import styles from './NewEntry.module.css'

const NewEntry = () => {
  return (
    <form className={styles.new_entry}>
      <textarea
        placeholder='Whats on your mind today? ...'
      >

      </textarea>
      <button>Save Entry</button>
    </form>
  )
}

export default NewEntry