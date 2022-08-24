// Require express
const express = require('express');
// Require express router
const router = express.Router();



// ROUTE GET ALL USERS
router.get('/', getEntries)


module.exports = router