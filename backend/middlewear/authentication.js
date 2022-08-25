const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requiresAuth = async (req, res, next) => {
  //Grab token
  const token = req.cookies["access-token"]
  // Create isAuthed variable with default value of false. If token can be verifies, the value will change to true.
  let isAuthed = false

  if(token) {

    try {
      
      // deconstruct token to get userID which is the payload converted into token in login call
      const { userId } = jwt.verify(token, process.env.JWT_SECRET)

      // use the userid to find the user in database
      const userFound = await UserModel.findById(userId)

      // if user is found return found user minus password and change is authed to true
      if(userFound) {
        req.user = {
          _id: userFound._id,
          email: userFound.email,
          name: userFound.name,
        }
        isAuthed = true
      }

    } catch (error) {
      // if error catched, is authed = false
      isAuthed = false
    }

    // if isauthed is true, then we can continue with the call
    if(isAuthed) {
      return next()
    } else {
      return res.status(401).send('NOT AUTHORISED')
    }
    
  }
}

module.exports = requiresAuth