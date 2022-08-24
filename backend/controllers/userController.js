// Import Entry Model
const { userInfo } = require('os');
const UserModel = require('../models/userModel.js')
// Import bycrypt to hash password
const bycrypt = require('bcryptjs')
// Import authenticaton middlewear
const requiresAuth = require('../middlewear/authentication.js')


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
      return res.status(400).json({ error: 'There is a problem with your login credentials'})
    };

    // STEP 2 ->
    // If email on step 1 is found, compare the request password with password from database.
    // If passwords dont match, return error and stop
    const passwordMatch = await bycrypt.compare(req.body.password, UserModel.password)
    if(!passwordMatch) {
      return res.status(400).json({ error: 'There is a problem with your login credentials'})
    };

    // STEP 3 -> 
    // Create token based on the user._id which then will be encoded using JWT
    const payloadToken = {userId: UserModel._id};
    const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {expiresIn: '7d'})
    // Use created token to set cookie. / Note: .cookie(name, value, options)
    res.cookie("acess-token", token, {
      // expiration option
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    // STEP 4 ->
    // Return logged user as a response including the token created.
    return res.json({
      _id: UserModel._id,
      name: UserModel.name,
      email: UserModel.email,
      token: token,
    })

  } catch (error) {
    // STEP 5 ->
    // If error, console.log the error, set status to error code and send error message
    console.log(error)
    res.status(400).json({error: 'Invalid Credentials'})
  }

  
}




module.exports = { registerUser, loginUser}