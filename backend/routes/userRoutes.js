// Require express
const express = require('express');
// Require express router
const router = express.Router();

// Import controllers to be used with routes in this file.
const { registerUser, loginUser, currentUser } = require('../controllers/userController.js')


// ROUTE ->  REGISTER NEW USER
router.post('/register', registerUser)
// ROUTE -> LOGIN USER
router.post('/login', loginUser)
// ROUTE -> GET CURRENT USER
router.get('/current', currentUser)


module.exports = router