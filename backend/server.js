// INITIALIZE EXPRESS SERVER
// - Require express
const express = require('express')
// - Start express by saving it on variable app
const app = express();

// REQUIRE dotenv TO ACCESS ENVIRONMENT VARIABLES IN THE .ENV FILE
require('dotenv').config()



// Express middleware service - recognizes the incoming Request Object as a JSON Object.
app.use(express.json());
// Express middleware service - recognizes the incoming Request Object as Strings or Arrays.
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})