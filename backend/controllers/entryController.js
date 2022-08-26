// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.

// Import Entry Model
const EntryModel = require('../models/entryModel.js')
// Import authenticaton middlewear
const requiresAuth = require('../middleware/authentication.js')

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// FOR TESTING!
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - GET USERS ENTRIES
// Route - GET /api/entry/user
// PRIVATE - uses requiresAuth middleware
const getUsersEntries = async (req, res) => {
  try {
    const usersEntries = await EntryModel.find({
      user: req.user._id
    })

    res.json(usersEntries)
  } catch (error) {
    console.log(error)
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - DELETE USERS ENTRY
// Route - DELETE /api/entry/user/:entryId
// PRIVATE - uses requiresAuth middleware
const deleteEntry = async (req, res) => {
  try {
    // STEP 1 ->
    // Find the entry to delete based on the entry _id from the url params
    const entryToDelete = await EntryModel.findOne({
      _id: req.params.entryId
    })
    // STEP 2 ->
    // If entry was not found in step 1, set status to error code and send error message
    if(!entryToDelete) {
      return res.status(404).json({error: "Entry to delete not found"})
    }
    // STEP 3 ->
    // Delete the found entry saved in entryToDelete variable in step 1 with remove method.
    // Respond with success status and send the deleted entry id as confirmation
    await entryToDelete.remove()
    res.status(200).json({deleted_entry_id: req.params.entryId})
    
  // STEP 4 ->
  // If error in try section, console.log error and send error message with error status.
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - UPDATES USERS ENTRY
// Route - PUT /api/entry/user/:entryId
// PRIVATE - uses requiresAuth middleware
 const updateEntry = async (req, res) => {

 }


module.exports = { getEntries, createEntry, getUsersEntries, deleteEntry, updateEntry}