// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.

// Import Entry Model
const EntryModel = require('../models/entryModel.js')
const UserModel = require('../models/userModel.js')
// Import authenticaton middlewear
const requiresAuth = require('../middleware/authentication.js')

//////////////////////////////////////////////////////////////////////
// TESTING
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
// CREATE NEW ENTRY
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
// GET ALL USERS ENTRIES
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
// DELETE USERS ENTRY
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
    // Confirm the entryToDelete users id matches the id of the user logged in.
    // First we find the logged in user and save it in variable loggedUserId.
    // Second we match the loggedin user id to the entrytodelete user id, if no match we stop and send error message. 
    const loggedUserId = await UserModel.findById({
      _id: req.user._id
    });
    if(loggedUserId._id.toString() !== entryToDelete.user.toString()) {
      return  res.status(401).json({ error: 'User Id not authorized to delete this entry'})
    }
    // STEP 4 ->
    // Delete the found entry saved in entryToDelete variable in step 1 with remove method.
    // Respond with success status and send the deleted entry id as confirmation
    await entryToDelete.remove()
    res.status(200).json({deleted_entry_id: req.params.entryId})
    
  // STEP 5 ->
  // If error in try section, console.log error and send error message with error status.
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

//////////////////////////////////////////////////////////////////////
// UPDATE USERS ENTRY
//////////////////////////////////////////////////////////////////////

// Description - UPDATE USERS ENTRY
// Route - PUT /api/entry/user/:entryId
// PRIVATE - uses requiresAuth middleware
const updateEntry = async (req, res) => {
  try {
    // STEP 1 ->
    // Find the entry to update based on the entry _id from the url params
    const entryToUpdate = await EntryModel.findOne({
      _id: req.params.entryId
    });
    // STEP 2 ->
    // If entry was not found in step 1, set status to error code and send error message
    if(!entryToUpdate) {
      return res.status(404).json({error: "Entry to update not found"})
    }
    // STEP 3 ->
    //
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      // Parameter 1: Filter -> The id to look for...
      {_id: req.params.entryId},
      // Parameter 2: Update -> What to update, with new value...
      {content: req.body.content},
      // Paremeter 3: Option -> By default this findByIdAndUpdate method returns the document as it was before updated. With this option set to true, the method will return the updated document
      {new: true}
    )
    // STEP 4 ->
    // Return the updated entry
    return res.json(updatedEntry)

  // STEP 5 ->
  // If error is catched, console.log error, set status to error code and send error message
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message)
  }
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


module.exports = { getEntries, createEntry, getUsersEntries, deleteEntry, updateEntry}