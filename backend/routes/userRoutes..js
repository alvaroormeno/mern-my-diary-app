// Require express
const express = require('express');
// Require express router
const router = express.Router();



// ROUTE GET ALL USERS
router.get('/register', getEntries)


module.exports = router