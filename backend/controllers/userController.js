// Import Entry Model
const { userInfo } = require('os');
const UserModel = require('../models/userModel.js')
// Import bycrypt to hash password
const bycrypt = require('bcryptjs')
// Import authenticaton middlewear
const requiresAuth = require()


// Description - REGISTER NEW USER
// Route - GET /api/user/register
const registerUser = async (req, res) => {
  try {
    //Deconstruct body data from req.body
    const {name, email, password} = req.body;

    // Check first if there is a user registered with the same email
    const userEmailExists = await UserModel.findOne(
      {
        email: req.body.email
      }
    );
    if(userEmailExists) {
      return res.status(500).json({error: "Email is already in use for another regsitered User!"})
    }

    // Hash password for security
    const hashedPassword = await bycrypt.hash(req.body.password, 12)

    //Create the user
    const newUser = await UserModel.create(
      {
        name: name,
        email: email,
        password: hashedPassword,
      }
    )

    //Resond back the new user
    res.status(200).json(
      {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      }
    )

  } catch (error) {
    console.log(error)
    res.send("New User Registered Successful")
    
  }
}

module.exports = { registerUser}