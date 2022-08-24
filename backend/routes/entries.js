// FILE MAIN NOTE:
// - We dont want to clutter server.js by having all of our routes there. Therefore in this file we will have all of our routes which we can export and then import them in server.js.
////////////////////////////////////////////////////////////////////

// Require express
const express = require('express');
// Require express router
const router = express.Router();

// Import controllers to be used with routes in this file.
const { getEntries, createEntry } = require('../controllers/entryController.js')


// ROUTE GET ALL ENTRIES
router.get('/', getEntries)

// ROUTE POST A NEW ENTRY
router.post('/new', createEntry)


// Export controllers
module.exports = router