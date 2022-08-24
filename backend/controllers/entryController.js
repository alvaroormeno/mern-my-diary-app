// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.

// Import Entry Model
const Entry = require('../models/entryModel.js')


const getEntries = async (req, res) => {
  res.send('Works, here are all the entries')
}

const createEntry = async (req, res) => {

  try {
    const newEntry = await Entry.create({
      user: req.body._id,
      content: req.body.content,
    })

    return res.status(200).json(newEntry)

  } catch (error) {
    console.log("here is error" + error)
    return res.status(500).send(error.message)
    
  }

}

module.exports = { getEntries, createEntry}