// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.

// Import Entry Model
const Entry = require('../models/entryModel.js')


const getEntries = async (req, res) => {
  res.send('Works, here are all the entries')
}

const createEntry = async (req, res) => {

  try {
    const newEntry = new Entry ({
      content: req.body.content,
    })

    await newEntry.save()

    return res.status(200).json(newEntry)

  } catch (error) {
    console.log(error)
    
  }

  

  
}

module.exports = { getEntries, createEntry}