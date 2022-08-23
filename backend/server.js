// INITIALIZE EXPRESS SERVER
// - Require express
const express = require('express')
// - Start express by saving it on variable app
const app = express();

// REQUIRE dotenv TO ACCESS ENVIRONMENT VARIABLES IN THE .ENV FILE
require('dotenv').config()




// IMPORT ROUTES TO BE USED WITH API MAIN ROUTE
const entryRoute = require('./routes/entry')
// API MAIN ROUTE
// - Will use different routes from routes.js and each route its respective controller in controller.js
app.use('/api/entry', entryRoute)



// Express middleware service - recognizes the incoming Request Object as a JSON Object.
app.use(express.json());
// Express middleware service - recognizes the incoming Request Object as Strings or Arrays.
app.use(express.urlencoded({extended: true}))
// Connect and listen to Express server using PORT from .env file
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})




// NOTES:  START SERVER WITH -> npm run server
// - Will run backend server with nodemon. (look at package.json script)