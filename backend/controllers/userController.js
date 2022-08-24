// Import Entry Model
const { userInfo } = require('os');
const UserModel = require('../models/userModel.js')


// Description - REGISTER NEW USER
// Route - GET /api/user/register
const registerUser = async (req, res) => {
  try {
    //Deconstruct body data from req.body
    const {name, email, password} = req.body;

    //Create the user
    const newUser = await UserModel.create(
      {
        name: name,
        email: email,
        password: password,
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