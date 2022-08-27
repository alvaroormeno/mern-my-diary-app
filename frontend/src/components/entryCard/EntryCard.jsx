import React, {useState} from 'react'

import styles from './EntryCard.module.css'



const EntryCard = () => {

  let contentTry = "quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."

const [ entryContent, setEntryContent ] = useState(contentTry)




  return (
    
    // ENTRY CARD MAIN CONTAINER
    <div className={styles.entry_card}>

      {/* Entry Info */}
      <div className={styles.entry_info}>
        <h4>Entry # <span>1</span></h4>
        <h4>Posted on <span>10/10/2022</span></h4>
      </div>

      {/* Textarea for Entry Posts */}
      <textarea 
        type="text"
        value={entryContent}
        readOnly={true}
        rows={10}
      />
      
    </div>
  )
}

export default EntryCard