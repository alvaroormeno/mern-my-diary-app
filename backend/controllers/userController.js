// Import Entry Model
const { userInfo } = require('os');
const UserModel = require('../models/userModel.js')
// Import bycrypt to hash password
const bycrypt = require('bcryptjs')
// Import jwt
const jwt = require('jsonwebtoken')
// Import authenticaton middlewear
const requiresAuth = require('../middleware/authentication.js')

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - REGISTER NEW USER
// Route - GET /api/user/register
const registerUser = async (req, res) => {
  try {
    // STEP 1 ->
    // Check if users email is already on saved on database.
    // If email is not found return error message and stop.
    // .findOne() will return a complete array of users that match the criteria specified.
    const userEmailExists = await UserModel.findOne({
      email: req.body.email
    });
    if(userEmailExists) {
      return res.status(500).json({error: "Email is already in use for another regsitered User!"})
    }
    // STEP 2 ->
    // If email on step 1 is found, hash the request password with bycrypt
    // Hash password for security
    const hashedPassword = await bycrypt.hash(req.body.password, 12)
    // STEP 3 ->
    //Create the user in database
    const newUser = await UserModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }
    )
    // STEP 4 ->
    // Create token based on user id which will be encoded by JWT and saved as cookie.
    // This will let newly registered user be able to continue using site without having to login.
    const payloadToken = {userId: newUser._id};
    const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {expiresIn: "7d"})
    // Use created token to set cookie. / Note: .cookie(name, value, options)
    res.cookie('access-token', token, {
      // expiration option
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    //STEP 5 ->
    //After creating user in DB, respond the user created data to confirm.
    res.status(200).json(
      {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        token: token,
      }
    )

  } catch (error) {
    // STEP 5 ->
    // If error, console.log the error, set status to error code and send error message
    console.log(error)
    res.send(error.message)
    
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - LOGIN USER
// Route - GET /api/user/login
const loginUser = async (req, res) => {

  try {

    // STEP 1 ->
    // Check if users email is already on saved on database.
    // If email is not found return error message and stop.
    // .findOne() will return a complete array of users that match the criteria specified.
    const userEmailExists = await UserModel.findOne({
      email: req.body.email,
    });
    if(!userEmailExists) {
      return res.status(400).json({ error: 'There is a problem with your login credentials 1'})
    };

    // STEP 2 ->
    // If email on step 1 is found, compare the request password with password from database.
    // If passwords dont match, return error and stop
    const passwordMatch = await bycrypt.compare(req.body.password, userEmailExists.password)
    if(!passwordMatch) {
      return res.status(400).json({ error: 'There is a problem with your login credentials 2'})
    };

    // STEP 3 -> 
    // Create token based on the user._id which then will be encoded using JWT
    const payloadToken = {userId: userEmailExists._id};
    const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {expiresIn: '7d'})
    // Use created token to set cookie. / Note: .cookie(name, value, options)
    res.cookie("access-token", token, {
      // expiration option
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    // STEP 4 ->
    // Return logged user as a response including the token created.
    return res.json({
      _id: userEmailExists._id,
      name: userEmailExists.name,
      email: userEmailExists.email,
      token: token,
    })

  } catch (error) {
    // STEP 5 ->
    // If error, console.log the error, set status to error code and send error message
    console.log(error)
    res.status(400).json({error: 'Invalid Credentials'})
  }

  
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Description - GET CURRENT USER
// Route - GET /api/user/current
const currentUser = async (req, res) => {
  try {
    const userNow = await req.user
   

    if(!userNow) {
      return res.status(401).json({ error: "NOT AUTHORIZED, PLEASE LOG IN OR REGISTER"})
    }

    return res.json(userNow)
  } catch (error) {
    console.log(error)
  }
}




module.exports = { registerUser, loginUser, currentUser}