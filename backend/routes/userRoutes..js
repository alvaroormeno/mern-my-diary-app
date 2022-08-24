// Require express
const express = require('express');
// Require express router
const router = express.Router();

// Import controllers to be used with routes in this file.
// const { getEntries, createEntry } = require('../controllers/entryController.js')
const { registerUser } = require('../controllers/userController.js')


// ROUTE GET ALL USERS
router.post('/register', registerUser)


module.exports = router