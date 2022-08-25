// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.

// Import Entry Model
const EntryModel = require('../models/entryModel.js')
// Import authenticaton middlewear
const requiresAuth = require('../middleware/authentication.js')

// Description - GET ALL ENTRIES
// Route - GET /api/entry
const getEntries = async (req, res) => {

  try {

    const entries = await EntryModel.find()
    res.status(200).json(entries)

  } catch (error) {

    console.log(error)
    return res.status(500).send(error.message)

  }
}


// // Description - CREATE NEW ENTRY
// // Route - PUT /api/entry/new
// const createEntry =  async (req, res) => {

//   try {
//     const newEntry = await Entry.create({
//       user: req.user._id,
//       content: req.body.content,
//     })

//     return res.status(200).json(newEntry)

//   } catch (error) {
//     console.log("here is error" + error)
//     return res.status(500).send(error.message)
    
//   }

// }

// Description - CREATE NEW ENTRY
// Route - PUT /api/entry/new
// PRIVATE - uses requiresAuth middleware
const createEntry =  async (req, res) => {
  try {
    // STEP 1 ->
    // After running requiresAUTH, create a new entry based on 2 properties, user and content.
    // The user has the value of req.user._id, this data comes from requiresAuth middleware.
    const newEntry = await EntryModel.create({
      user: req.user._id,
      content: req.body.content,
    })
    // STEP 2 ->
    // Once entry created, respond with a status of 200 and the new entry data.
    return res.status(200).json(newEntry)

  // STEP 3 ->
  // If error is catched in try section, console.log error and return error status + message.
  } catch (error) {
    console.log("here is error" + error)
    return res.status(500).send(error.message)
  }
}

module.exports = { getEntries, createEntry}