const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


// Note: This middleware will be used to Authorize routes where a user must be logged in.
// - For example, getting all entries from a user, or being able to create an entry by a user.
// - This middleware will be used in the routes files as another handler function. 

const requiresAuth = async (req, res, next) => {

  // STEP 1 ->
  // Grab token which are created when a user registers or a user logs in and save it on a variable for later use.
  // Create a variable which default value is false to be changed to true once token is verified.
  const token = req.cookies["access-token"]
  let isAuthed = false

  // STEP 2 ->
  // Check if there is a token in the request body from step 1 to continue with verification process.
  if(token) {
    try {
      
      // STEP 3 ->
      // Deconstruct token to grab "userID" from decoded token using jwt.verify
      // userID had the value of the logged-in/registered user's id.
      const { userId } = jwt.verify(token, process.env.JWT_SECRET)

      // STEP 4 ->
      // Using "userID" from step 1, find the user that matches in the database to confirm existance. This is authorization.
      const userFound = await UserModel.findById(userId)

      // STEP 5 ->
      // If a user is found in step 4, make the value of req.user to the data of the user found so it can be used in the controller handler function.
      // Change value of isAuthed to true since the user found in step 1 matches a user in DB.
      if(userFound) {
        req.user = userFound
        isAuthed = true
      }

    } catch (error) {
      // STEP 6 -> 
      // If there is an error from step 1 to step 5, change the value of isAuthed to false because this means the found user has not been verified.
      isAuthed = false
    }
  }
    // STEP 7 ->
    // If isAuthed = true, then we can continue with the controller handler function, else stop and return Not Authorized error.
    if(isAuthed) {
      return next()
    } else {
      return res.status(401).send('NOT AUTHORISEDdd')
    }
}

module.exports = requiresAuth