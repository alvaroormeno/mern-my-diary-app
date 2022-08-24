const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requiresAuth = async (req, res, next) => {
  //Grab token
  const token = req.cookies["access-token"]
  // Create isAuthed variable with default value of false. If token can be verifies, the value will change to true.
  let isAuthed = false

  if(token) {
    res.json({comment: 'auth works'})
  }
}
